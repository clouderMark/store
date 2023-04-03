import {Route, Routes} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import Admin from '../views/Admin/Admin';
import Basket from '../views/Basket';
import Product from '../views/Product';
import Contacts from '../views/Contacts';
import Delivery from '../views/Delivery';
import Login from '../views/Login';
import NotFound from '../views/NotFound';
import Shop from '../views/Shop/Shop';
import Signup from '../views/Signup';
import User from '../views/User';
import {useAppContext} from './AppContext';
import Checkout from '../views/Checkout';
import UserOrders from '../views/UserOrders';
import UserOrder from '../views/UserOrder';
import AdminOrders from '../views/AdminOrders';
import AdminOrder from '../views/AdminOrder';
import AdminIndustries from '../views/AdminIndustries';
import AdminSolutions from '../views/AdminSolutions';
import AdminAreas from '../views/AdminAreas';
import AdminProducts from '../views/AdminProducts';
import AdminMessages from '../views/AdminMessages';
import AdminMessage from '../views/AdminMessage';
import AdminSubscriptions from '../views/AdminSubscriptions';
import Main from '../views/Main/Main';
import Branches from '../views/Branches/Branches';
import AdminBranches from '../views/AdminBranches';
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
  {path: EPath.Branches, Component: Branches},
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
  {path: EPath.AdminBranches, Component: AdminBranches},
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
