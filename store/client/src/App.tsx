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
import RouterBreadcrumbs from './components/RouterBreadcrumbs/RouterBreadcrumbs';

const App = observer(() => {
  const {user, basket} = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([checkAuth(), fetchBasket()])
      .then(
        axios.spread((userData, basketData) => {
          if (userData && 'email' in userData) {
            user.login(userData);
          }

          if (basketData && 'products' in basketData) {
            basket.products = basketData.products;
          }
        }),
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <RouterBreadcrumbs/>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
});

export default App;
