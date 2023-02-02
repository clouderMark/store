import {useContext} from 'react';
import {Button, Container} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {AppContext} from '../components/AppContext.js';
import {logout} from '../http/userAPI.js';

const User = () => {
  const {user} = useContext(AppContext);
  const navigate = useNavigate();
  // eslint-disable-next-line
  const handleLogout = (event) => {
    logout();
    user.logout();
    navigate('/login', {replace: true});
  };

  return (
    <Container>
      <h1>Личный кабинет</h1>
      <p>
        Это личный кабинет постоянного покупателя магазина
      </p>
      <ul>
        <li><Link to="/user/orders">История заказов</Link></li>
      </ul>
      <Button onClick={handleLogout}>Выйти</Button>
    </Container>
  );
};

export default User;
