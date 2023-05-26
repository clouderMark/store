import {Button, Container, List, ListItem, ListItemButton, ListItemText, Typography} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import {useAppContext} from '../../components/AppContext';
import {logout} from '../../http/userAPI';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import {EPath} from '../../enums/EPath';

const User = () => {
  const {user} = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    user.logout();
    navigate(EPath.Login, {replace: true});
  };

  return (
    <>
      <Breadcrumbs />
      <Container maxWidth={false} sx={{mt: 2, mb: 10}}>
        <Typography component="h1" sx={{mb: 4, fontSize: '30px'}}>
          Личный кабинет
        </Typography>
        <Typography sx={{mb: 1}}>Это личный кабинет постоянного покупателя магазина</Typography>
        <List>
          <ListItem>
            <ListItemButton component={Link} to={EPath.UserOrders}>
              <ListItemText primary="Личный кабинет" />
            </ListItemButton>
          </ListItem>
        </List>
        <Button color="first" variant="contained" onClick={handleLogout} sx={{mt: 5}}>
          Выйти
        </Button>
      </Container>
    </>
  );
};

export default User;
