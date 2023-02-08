import {Button, Container} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {useAppContext} from '../components/AppContext';
import {logout} from '../http/userAPI';

const Admin = () => {
  const {user} = useAppContext();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    user.logout();
    navigate('/login', {replace: true});
  };

  return (
    <Container>
      <h1>Панель управления</h1>
      <p>Это панель управления магазином для администратора</p>
      <ul>
        <li><Link to="/admin/orders">Заказы в магазине</Link></li>
        <li><Link to="/admin/categories">Категории каталога</Link></li>
        <li><Link to="/admin/brands">Бренды каталога</Link></li>
        <li><Link to="/admin/products">Товары каталога</Link></li>
      </ul>
      <Button onClick={handleLogout}>Выйти</Button>
    </Container>
  );
};

export default Admin;
