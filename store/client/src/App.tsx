import {CssBaseline} from '@mui/material';
import {BrowserRouter} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {ThemeProvider} from '@mui/material/styles';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar/NavBar';
import {useAppContext} from './components/AppContext';
import {check as checkAuth} from './http/userAPI';
import {fetchBasket} from './http/basketAPI';
import Loader from './components/LinearDeterminate';
import {theme} from './styles/theme';
import {fetchIndustries, fetchSubIndustries, fetchSolutions} from './http/catalogAPI';
import Newsletter from './components/Newsletter/Newsletter';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

const App = observer(() => {
  const {user, basket, catalog} = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([checkAuth(), fetchBasket(), fetchIndustries(), fetchSubIndustries(), fetchSolutions()])
      .then((res) => {
        const [userData, basketData, industriesData, subIndustriesData, solutionsData] = res;

        if (userData) user.login(userData);
        basket.products = basketData.products;
        catalog.industries = industriesData;
        catalog.subIndustries = subIndustriesData;
        catalog.solutions = solutionsData;
      })
      .finally(() => {
        setLoading(false);
        catalog.industriesFetching = false;
        catalog.solutionsFetching = false;
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <NavBar />
        <AppRouter />
        <Contact />
        <Newsletter />
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
});

export default App;
