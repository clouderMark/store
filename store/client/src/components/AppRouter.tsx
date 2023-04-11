import {Route, Routes} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import Admin from '../views/forAdmin/Admin/Admin';
import Basket from '../views/forAll/Basket';
import Product from '../views/forAll/Product';
import Contacts from '../views/forAll/Contacts';
import Delivery from '../views/forAll/Delivery';
import Login from '../views/forAll/Login';
import NotFound from '../views/forAll/NotFound';
import Shop from '../views/forAll/Shop/Shop';
import Signup from '../views/forAll/Signup';
import User from '../views/forAll/User';
import {useAppContext} from './AppContext';
import Checkout from '../views/forAll/Checkout';
import UserOrders from '../views/forAll/UserOrders';
import UserOrder from '../views/forAll/UserOrder';
import AdminOrders from '../views/forAdmin/AdminOrders';
import AdminOrder from '../views/forAdmin/AdminOrder';
import AdminIndustries from '../views/forAdmin/AdminIndustries';
import AdminSolutions from '../views/forAdmin/AdminSolutions';
import AdminAreas from '../views/forAdmin/AdminAreas';
import AdminProducts from '../views/forAdmin/AdminProducts';
import AdminMessages from '../views/forAdmin/AdminMessages';
import AdminMessage from '../views/forAdmin/AdminMessage';
import AdminSubscriptions from '../views/forAdmin/AdminSubscriptions';
import Main from '../views/forAll/Main/Main';
import Industries from '../views/forAll/Branches/Industries';
import IndustriesItem from '../views/forAll/Branches/IndustriesItem';
import IndustriesSubItem from '../views/forAll/Branches/IndustriesSubItem';
import AdminSubIndustries from '../views/forAdmin/AdminSubIndustries';
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
  {path: EPath.Industries, Component: Industries},
  {path: EPath.IndustriesItem, Component: IndustriesItem},
  {path: EPath.IndustriesSubItem, Component: IndustriesSubItem},
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
  {path: EPath.AdminSubIndustries, Component: AdminSubIndustries},
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
