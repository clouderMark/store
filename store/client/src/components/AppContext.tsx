import React from 'react';
import UserStore from '../store/UserStore';
import CatalogStore from '../store/CatalogStore';
import BasketStore from '../store/BasketStore';

interface IContext {
  user: UserStore,
  catalog: CatalogStore,
  basket: BasketStore,
}

interface IProps {
  children: React.ReactNode;
}

const AppContext = React.createContext<IContext | null>(null);

const context = {
  user: new UserStore(),
  catalog: new CatalogStore(),
  basket: new BasketStore(),
};

const AppContextProvider = (props: IProps) => (
  <AppContext.Provider value={context}>
    {props.children}
  </AppContext.Provider>
);

const useAppContext = () => {
  const appContext = React.useContext(AppContext);

  if (!appContext) throw new Error('You need to use this hook inside a context provider');

  return appContext;
};

export {AppContextProvider, useAppContext};
