import {Container, Button, List, ListItem, ListItemButton, ListItemText, Typography} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import {useAppContext} from '../components/AppContext';
import {logout} from '../http/userAPI';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';

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
    address: '/admin/industries',
    content: 'Индустрии каталога',
  },
  {
    address: '/admin/solutions',
    content: 'Решения каталога',
  },
  {
    address: '/admin/areas',
    content: 'Области применения',
  },
  {
    address: '/admin/products',
    content: 'Товары каталога',
  },
  {
    address: '/admin/messages',
    content: 'Сообщения пользователей',
  },
  {
    address: '/admin/subscriptions',
    content: 'Подписки',
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
    <>
      <Breadcrumbs />
      <Container sx={{mt: 2}}>
        <Typography variant="h4">Панель управления</Typography>
        <Typography variant="body1">Это панель управления магазином для администратора</Typography>
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
    </>
  );
};

export default Admin;
