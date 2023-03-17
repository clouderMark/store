import React from 'react';
import {observer} from 'mobx-react-lite';
import {AppBar, Toolbar, Container, Box, Button, Divider} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {NavLink} from 'react-router-dom';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AnchorIcon from '@mui/icons-material/Anchor';
import SearchIcon from '@mui/icons-material/Search';
import {useAppContext} from '../AppContext';
import {articles} from './articles';
import styles from './styles/logo.module.css';
import {dFlex, justifySB, alignC} from '../../styles/flex';
import {ReactComponent as Icon} from '../../image/Logo.svg';
import {StyledBadge} from './StyledBadge';
import {NavBarButton} from './NavBarButton';
import {ArticlesMenu} from './ArticlesMenu';
import {IconTextField} from '../IconTextField';
import {container} from './styles/container';
import {queryMenu} from './queryMenu';

const NavBar = observer(() => {
  const {user, basket} = useAppContext();
  const matchesMenu = useMediaQuery(`(min-width:${queryMenu}px)`, {noSsr: true});
  const matchesNews = useMediaQuery('(min-width:830px)', {noSsr: true});

  return (
    <>
      <Container maxWidth={false} sx={[container]}>
        <AppBar color="inherit">
          <Toolbar>
            <Box sx={[dFlex, justifySB, alignC, {width: '100%'}]}>
              <Button component={NavLink} to="/" sx={{color: 'inherit'}}>
                <Icon className={styles.logo} />
              </Button>
              <Box sx={dFlex}>
                <NavBarButton title="Магазин" route="shop" icon={<ShoppingCartOutlinedIcon />} />
                {matchesNews ? <NavBarButton title="Новости" route="news" icon={<NewspaperIcon />} /> : null}
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
                {!matchesMenu ? <ArticlesMenu /> : null}
              </Box>
            </Box>
            {matchesMenu ? (
              <Box sx={[{mt: 1.2}, dFlex, justifySB, alignC, {width: '100%'}]}>
                <Box>
                  {articles.map((article) => (
                    <Button component={NavLink} to={`/${article.link}`} key={article.link}>
                      {article.title}
                    </Button>
                  ))}
                </Box>
                <IconTextField
                  label="Введите строку поиска"
                  variant="standard"
                  sx={{width: 410, height: 63}}
                  icon={<SearchIcon />}
                />
              </Box>
            ) : null}
          </Toolbar>
        </AppBar>
      </Container>
      <Divider sx={{borderBottomWidth: 1.5}} />
    </>
  );
});

export default NavBar;
