import React from 'react';
import UserStore from '../store/UserStore';
import CatalogStore from '../store/CatalogStore';
import BasketStore from '../store/BasketStore';

const AppContext = React.createContext();

const context = {
  user: new UserStore(),
  catalog: new CatalogStore(),
  basket: new BasketStore(),
};

const AppContextProvider = (props) => (
  <AppContext.Provider value={context}>
    {props.children}
  </AppContext.Provider>
);

export {AppContext, AppContextProvider};
