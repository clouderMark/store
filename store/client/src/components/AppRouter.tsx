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
import Branches from '../views/forAll/Branches/Branches';
import BranchesItem from '../views/forAll/Branches/BranchesItem';
import BranchesSubItem from '../views/forAll/Branches/BranchesSubItem';
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
  {path: EPath.BranchesItem, Component: BranchesItem},
  {path: EPath.BranchesSubItem, Component: BranchesSubItem},
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
