import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import axios from 'axios';
import {ThemeProvider} from '@mui/material/styles';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar/NavBar';

import {useAppContext} from './components/AppContext';
import {check as checkAuth} from './http/userAPI';
import {fetchBasket} from './http/basketAPI';
import Loader from './components/Loader';
import {theme} from './styles/theme';
import {fetchIndustries} from './http/catalogAPI';

const App = observer(() => {
  const {user, basket, catalog} = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([checkAuth(), fetchBasket(), fetchIndustries()])
      .then(
        axios.spread((userData, basketData, industriesData) => {
          if (userData && 'email' in userData) {
            user.login(userData);
          }

          if (basketData && 'products' in basketData) {
            basket.products = basketData.products;
          }

          if (Array.isArray(industriesData)) {
            catalog.industries = industriesData;
          }
        }),
      )
      .finally(() => {
        setLoading(false);
        catalog.industriesFetching = false;
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
});

export default App;
