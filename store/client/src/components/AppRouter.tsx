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
import AdminBrands from '../pages/AdminBrands';
import AdminAreas from '../pages/AdminAreas';
import AdminProducts from '../pages/AdminProducts';

const publicRoutes = [
  {path: '/shop', Component: Shop},
  {path: '/login', Component: Login},
  {path: '/signup', Component: Signup},
  {path: '/shop/:id', Component: Product},
  {path: '/basket', Component: Basket},
  {path: '/checkout', Component: Checkout},
  {path: '/delivery', Component: Delivery},
  {path: '/contacts', Component: Contacts},
  {path: '*', Component: NotFound},
];

const authRoutes = [
  {path: '/user', Component: User},
  {path: '/user/orders', Component: UserOrders},
  {path: 'user/order/:id', Component: UserOrder},
];

const adminRoutes = [
  {path: '/admin', Component: Admin},
  {path: '/admin/orders', Component: AdminOrders},
  {path: '/admin/order/:id', Component: AdminOrder},
  {path: '/admin/industries', Component: AdminIndustries},
  {path: '/admin/brands', Component: AdminBrands},
  {path: '/admin/areas', Component: AdminAreas},
  {path: '/admin/products', Component: AdminProducts},
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
