import {Container, Button, List, ListItem, ListItemButton, ListItemText} from '@mui/material';
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
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/admin/orders'>
            <ListItemText primary='Заказы в магазине'/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/admin/categories'>
            <ListItemText primary='Категории каталога'/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/admin/brands'>
            <ListItemText primary='Бренды каталога'/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/admin/products'>
            <ListItemText primary='Товары каталога'/>
          </ListItemButton>
        </ListItem>
      </List>
      <Button onClick={handleLogout} variant='outlined'>Выйти</Button>
    </Container>
  );
};

export default Admin;
