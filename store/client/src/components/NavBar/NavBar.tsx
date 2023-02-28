import {observer} from 'mobx-react-lite';
import {AppBar, Toolbar, Container, Box, Button, TextField, InputAdornment} from '@mui/material';
import {NavLink} from 'react-router-dom';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AnchorIcon from '@mui/icons-material/Anchor';
import SearchIcon from '@mui/icons-material/Search';
import {useAppContext} from '../AppContext';
import {navigation} from './navigation';
import styles from './styles/logo.module.css';
import {dFlex, justifySB, alignC} from './styles/flex';
import {ReactComponent as Icon} from './Logo.svg';
import {StyledBadge} from './StyledBadge';
import {NavBarButton} from './NavBarButton';

const NavBar = observer(() => {
  const {user, basket} = useAppContext();

  return (
    <AppBar color="inherit" position="sticky">
      <Toolbar>
        <Container maxWidth={false} sx={{width: 1400, height: 188, pt: 3}}>
          <Box sx={[dFlex, justifySB, alignC]}>
            <Button component={NavLink} to="/" sx={{color: 'inherit'}}>
              <Icon className={styles.logo} />
            </Button>
            <Box sx={dFlex}>
              <NavBarButton title="Магазин" route="shop" icon={<ShoppingCartOutlinedIcon />} />
              <NavBarButton title="Новости" route="news" icon={<NewspaperIcon />} />
              {user.isAuth ? (
                <NavBarButton title="Кабинет" route="user" icon={<PersonOutlineOutlinedIcon />} />
              ) : (
                <NavBarButton title="Войти" route="login" icon={<PersonOutlineOutlinedIcon />} />
              )}
              {user.isAdmin && <NavBarButton title="Управление" route="admin" icon={<AnchorIcon />} />}
              <NavBarButton
                title="Корзина"
                route="basket"
                icon={
                  <StyledBadge badgeContent={basket.count} color="secondary">
                    <ShoppingBagOutlinedIcon />
                  </StyledBadge>
                }
              />
            </Box>
          </Box>
          <Box sx={[{mt: 1.6}, dFlex, justifySB, alignC]}>
            <Box>
              {navigation.map((nav) => (
                <Button component={NavLink} to={`/${nav.link}`} key={nav.link}>
                  {nav.title}
                </Button>
              ))}
            </Box>
            <TextField
              label="Введите строку поиска"
              variant="standard"
              sx={{width: 410, height: 63}}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
});

export default NavBar;
