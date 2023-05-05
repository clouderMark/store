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
import Industries from '../views/forAll/Industries/Industries';
import IndustriesItem from '../views/forAll/Industries/IndustriesItem';
import IndustriesSubItem from '../views/forAll/Industries/IndustriesSubItem';
import AdminSubIndustries from '../views/forAdmin/AdminSubIndustries';
import Solutions from '../views/forAll/Solutions/Solutions';
import {EPath} from '../enums/EPath';

enum ERoute {
  Path = 'path',
  Component = 'Component',
}

interface IRoute {
  [ERoute.Path]: EPath,
  [ERoute.Component](): JSX.Element,
}

const publicRoutes: IRoute[] = [
  {[ERoute.Path]: EPath.Shop, [ERoute.Component]: Shop},
  {[ERoute.Path]: EPath.Login, [ERoute.Component]: Login},
  {[ERoute.Path]: EPath.Signup, [ERoute.Component]: Signup},
  {[ERoute.Path]: EPath.Product, [ERoute.Component]: Product},
  {[ERoute.Path]: EPath.Basket, [ERoute.Component]: Basket},
  {[ERoute.Path]: EPath.Checkout, [ERoute.Component]: Checkout},
  {[ERoute.Path]: EPath.Delivery, [ERoute.Component]: Delivery},
  {[ERoute.Path]: EPath.Contacts, [ERoute.Component]: Contacts},
  {[ERoute.Path]: EPath.NotFound, [ERoute.Component]: NotFound},
  {[ERoute.Path]: EPath.Main, [ERoute.Component]: Main},
  {[ERoute.Path]: EPath.Industries, [ERoute.Component]: Industries},
  {[ERoute.Path]: EPath.IndustriesItem, [ERoute.Component]: IndustriesItem},
  {[ERoute.Path]: EPath.IndustriesSubItem, [ERoute.Component]: IndustriesSubItem},
  {[ERoute.Path]: EPath.Solutions, [ERoute.Component]: Solutions},
];

const authRoutes: IRoute[] = [
  {[ERoute.Path]: EPath.User, [ERoute.Component]: User},
  {[ERoute.Path]: EPath.UserOrders, [ERoute.Component]: UserOrders},
  {[ERoute.Path]: EPath.UserOrder, [ERoute.Component]: UserOrder},
];

const adminRoutes: IRoute[] = [
  {[ERoute.Path]: EPath.Admin, [ERoute.Component]: Admin},
  {[ERoute.Path]: EPath.AdminOrders, [ERoute.Component]: AdminOrders},
  {[ERoute.Path]: EPath.AdminOrder, [ERoute.Component]: AdminOrder},
  {[ERoute.Path]: EPath.AdminIndustries, [ERoute.Component]: AdminIndustries},
  {[ERoute.Path]: EPath.AdminSolutions, [ERoute.Component]: AdminSolutions},
  {[ERoute.Path]: EPath.AdminAreas, [ERoute.Component]: AdminAreas},
  {[ERoute.Path]: EPath.AdminProducts, [ERoute.Component]: AdminProducts},
  {[ERoute.Path]: EPath.AdminMessages, [ERoute.Component]: AdminMessages},
  {[ERoute.Path]: EPath.AdminMessage, [ERoute.Component]: AdminMessage},
  {[ERoute.Path]: EPath.AdminSubscriptions, [ERoute.Component]: AdminSubscriptions},
  {[ERoute.Path]: EPath.AdminSubIndustries, [ERoute.Component]: AdminSubIndustries},
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
