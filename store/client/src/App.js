import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import axios from 'axios';
import AppRouter from './components/AppRouter.js';
import NavBar from './components/NavBar.js';

import {AppContext} from './components/AppContext.js';
import {check as checkAuth} from './http/userAPI.js';
import {fetchBasket} from './http/basketAPI.js';
import Loader from './components/Loader';

const App = observer(() => {
  const {user, basket} = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([checkAuth(), fetchBasket()])
      .then(
        axios.spread((userData, basketData) => {
          if (userData) {
            user.login(userData);
          }

          basket.products = basketData.products;
        }),
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
