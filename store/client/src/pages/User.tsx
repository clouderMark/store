import {Button, Container} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {useAppContext} from '../components/AppContext';
import {logout} from '../http/userAPI';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';

const User = () => {
  const {user} = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    user.logout();
    navigate('/login', {replace: true});
  };

  return (
    <>
      <Breadcrumbs />
      <Container>
        <h1>Личный кабинет</h1>
        <p>Это личный кабинет постоянного покупателя магазина</p>
        <ul>
          <li>
            <Link to="/user/orders">История заказов</Link>
          </li>
        </ul>
        <Button onClick={handleLogout}>Выйти</Button>
      </Container>
    </>
  );
};

export default User;
