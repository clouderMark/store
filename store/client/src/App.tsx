import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {ThemeProvider} from '@mui/material/styles';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar/NavBar';

import {useAppContext} from './components/AppContext';
import {check as checkAuth} from './http/userAPI';
import {fetchBasket} from './http/basketAPI';
import Loader from './components/Loader';
import {theme} from './styles/theme';
import {fetchIndustries, fetchSubIndustries} from './http/catalogAPI';

const App = observer(() => {
  const {user, basket, catalog} = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([checkAuth(), fetchBasket(), fetchIndustries(), fetchSubIndustries()])
      .then((res) => {
        const [userData, basketData, industriesData, subIndustriesData] = res;

        if (userData) user.login(userData);
        basket.products = basketData.products;
        catalog.industries = industriesData;
        catalog.subIndustries = subIndustriesData;
      })
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
