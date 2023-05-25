import {Container, Button, List, ListItem, ListItemButton, ListItemText, Typography} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import {useAppContext} from '../../../components/AppContext';
import {logout} from '../../../http/userAPI';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import {EPath} from '../../../enums/EPath';
import {links} from './links';

const Admin = () => {
  const {user} = useAppContext();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    user.logout();
    navigate(EPath.Login, {replace: true});
  };

  return (
    <>
      <Breadcrumbs />
      <Container sx={{mt: 2, mb: 10}}>
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
