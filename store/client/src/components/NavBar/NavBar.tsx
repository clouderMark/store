import {observer} from 'mobx-react-lite';
import {AppBar, Toolbar, Container, Box, Button, TextField, InputAdornment} from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AnchorIcon from '@mui/icons-material/Anchor';
import SearchIcon from '@mui/icons-material/Search';
import {NavLink} from 'react-router-dom';
import {useAppContext} from '../AppContext';
import styles from './NavBar.module.css';
import {ReactComponent as Icon} from './Logo.svg';
import {StyledBadge} from './StyledBadge';
import {navigation} from './navigation';

const NavBar = observer(() => {
  const {user, basket} = useAppContext();

  return (
    <AppBar color="inherit" position="sticky">
      <Toolbar>
        <Container maxWidth={false} sx={{width: 1400, height: 188}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Button component={NavLink} to="/" className={styles.buttonLogo}>
              <Icon className={styles.logo} />
            </Button>
            <Box sx={{display: 'flex'}}>
              <Button component={NavLink} to="/shop" className={styles.button} color="inherit" aria-label="магазин">
                <Box className={styles.box}>
                  <ShoppingCartOutlinedIcon />
                </Box>
                Магазин
              </Button>
              <Button component={NavLink} to="/news" className={styles.button} color="inherit" aria-label="новости">
                <Box className={styles.box}>
                  <NewspaperIcon />
                </Box>
                Новости
              </Button>
              {user.isAuth ? (
                <Button
                  component={NavLink}
                  to="/user"
                  className={styles.button}
                  color="inherit"
                  aria-label="Личный кабинет"
                >
                  <Box className={styles.box}>
                    <PersonOutlineOutlinedIcon />
                  </Box>
                  Кабинет
                </Button>
              ) : (
                <Button component={NavLink} to="/login" className={styles.button} color="inherit" aria-label="Войти">
                  <Box className={styles.box}>
                    <PersonOutlineOutlinedIcon />
                  </Box>
                  Войти
                </Button>
              )}
              {user.isAdmin && (
                <Button
                  component={NavLink}
                  to="/admin"
                  className={styles.button}
                  color="inherit"
                  aria-label="Панель управления"
                >
                  <Box className={styles.box}>
                    <AnchorIcon />
                  </Box>
                  Управление
                </Button>
              )}
              <Button component={NavLink} to="/basket" className={styles.button} color="inherit" aria-label="Корзина">
                <Box className={styles.box}>
                  <StyledBadge badgeContent={basket.count} color="secondary">
                    <ShoppingBagOutlinedIcon />
                  </StyledBadge>
                </Box>
                Корзина
              </Button>
            </Box>
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
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
              sx={{width: 410, height: 39}}
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
