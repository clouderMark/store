import {Route, Routes} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import Admin from '../pages/Admin';
import Basket from '../pages/Basket';
import Product from '../pages/Product';
import Contacts from '../pages/Contacts';
import Delivery from '../pages/Delivery';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Shop from '../pages/Shop/Shop';
import Signup from '../pages/Signup';
import User from '../pages/User';
import {useAppContext} from './AppContext';
import Checkout from '../pages/Checkout';
import UserOrders from '../pages/UserOrders';
import UserOrder from '../pages/UserOrder';
import AdminOrders from '../pages/AdminOrders';
import AdminOrder from '../pages/AdminOrder';
import AdminIndustries from '../pages/AdminIndustries';
import AdminSolutions from '../pages/AdminSolutions';
import AdminAreas from '../pages/AdminAreas';
import AdminProducts from '../pages/AdminProducts';
import AdminMessages from '../pages/AdminMessages';
import AdminMessage from '../pages/AdminMessage';
import AdminSubscriptions from '../pages/AdminSubscriptions';
import Main from '../pages/Main/Main';
import {EPath} from '../enums/EPath';

const publicRoutes = [
  {path: EPath.Shop, Component: Shop},
  {path: EPath.Login, Component: Login},
  {path: EPath.Signup, Component: Signup},
  {path: EPath.Product, Component: Product},
  {path: EPath.Basket, Component: Basket},
  {path: EPath.Checkout, Component: Checkout},
  {path: EPath.Delivery, Component: Delivery},
  {path: EPath.Contacts, Component: Contacts},
  {path: EPath.NotFound, Component: NotFound},
  {path: EPath.Main, Component: Main},
];

const authRoutes = [
  {path: EPath.User, Component: User},
  {path: EPath.UserOrders, Component: UserOrders},
  {path: EPath.UserOrder, Component: UserOrder},
];

const adminRoutes = [
  {path: EPath.Admin, Component: Admin},
  {path: EPath.AdminOrders, Component: AdminOrders},
  {path: EPath.AdminOrder, Component: AdminOrder},
  {path: EPath.AdminIndustries, Component: AdminIndustries},
  {path: EPath.AdminSolutions, Component: AdminSolutions},
  {path: EPath.AdminAreas, Component: AdminAreas},
  {path: EPath.AdminProducts, Component: AdminProducts},
  {path: EPath.AdminMessages, Component: AdminMessages},
  {path: EPath.AdminMessage, Component: AdminMessage},
  {path: EPath.AdminSubscriptions, Component: AdminSubscriptions},
];

const AppRouter = observer(() => {
  const {user} = useAppContext();

  return (
    <Routes>
      {publicRoutes.map(({path, Component}) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {user.isAuth && authRoutes.map(({path, Component}) => <Route key={path} path={path} element={<Component />} />)}
      {user.isAdmin && adminRoutes.map(({path, Component}) => <Route key={path} path={path} element={<Component />} />)}
    </Routes>
  );
});

export default AppRouter;
