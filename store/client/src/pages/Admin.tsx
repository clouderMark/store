import {Container, Button, List, ListItem, ListItemButton, ListItemText} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import {useAppContext} from '../components/AppContext';
import {logout} from '../http/userAPI';

interface ILinks {
  address: string;
  content: string;
}

const links: ILinks[] = [
  {
    address: '/admin/orders',
    content: 'Заказы в магазине',
  },
  {
    address: '/admin/categories',
    content: 'Категории каталога',
  },
  {
    address: '/admin/brands',
    content: 'Бренды каталога',
  },
  {
    address: '/admin/products',
    content: 'Товары каталога',
  },
];

const Admin = () => {
  const {user} = useAppContext();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    user.logout();
    navigate('/login', {replace: true});
  };

  return (
    <Container sx={{mt: 2}}>
      <h1>Панель управления</h1>
      <p>Это панель управления магазином для администратора</p>
      <List>
        {links.map((item, i) => (
          <ListItem disablePadding key={i}>
            <ListItemButton component={Link} to={item.address}>
              <ListItemText primary={item.content} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button onClick={handleLogout} variant="outlined">
        Выйти
      </Button>
    </Container>
  );
};

export default Admin;
