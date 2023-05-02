import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
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
import NavBarButton from './NavBarButton';
import TabletMenu from './TabletMenu';
import {IconTextField} from '../IconTextField';
import {container} from './styles/container';
import {queryTablet} from '../commonContent/queryTablet';
import {queryMobile} from './query';
import {list} from './styles/list';
import DesctopSubMenu from './DesctopSubMenu';
import {EPath} from '../../enums/EPath';
import {IArticle} from './types';

const NavBar = observer(() => {
  const {user, basket} = useAppContext();
  const matchesMenu = useMediaQuery(`(min-width:${queryTablet}px)`, {noSsr: true});
  const matchesNews = useMediaQuery('(min-width:830px)', {noSsr: true});
  const matchesMobile = useMediaQuery(`(min-width:${queryMobile}px)`, {noSsr: true});
  const [anchorElListItem, setAnchorListItem] = useState<null | HTMLElement>(null);
  const [item, setItem] = useState<IArticle>();

  const handleClickDesctopMenu = (event: React.MouseEvent<HTMLElement>, elNumber: number) => {
    setAnchorListItem(event.currentTarget);
    setItem(articles[elNumber]);
  };

  const handleCloseDesctopMenu = () => {
    setAnchorListItem(null);
  };

  return (
    <>
      <Container maxWidth={false} sx={[container]}>
        <AppBar color="inherit">
          <Toolbar>
            <Box sx={[dFlex, justifySB, alignC, {width: '100%'}]}>
              <Button component={NavLink} to={EPath.Main} sx={{color: 'inherit'}}>
                <Icon className={styles.logo} />
              </Button>
              <Box sx={dFlex}>
                <NavBarButton title="Магазин" route={EPath.Shop} icon={<ShoppingCartOutlinedIcon />} />
                {matchesNews ? <NavBarButton title="Новости" route={EPath.News} icon={<NewspaperIcon />} /> : null}
                {user.isAuth ? (
                  <NavBarButton title="Кабинет" route={EPath.User} icon={<PersonOutlineOutlinedIcon />} />
                ) : (
                  <NavBarButton title="Войти" route={EPath.Login} icon={<PersonOutlineOutlinedIcon />} />
                )}
                {user.isAdmin && matchesMobile ? (
                  <NavBarButton title="Управление" route={EPath.Admin} icon={<AnchorIcon />} />
                ) : null}
                <NavBarButton
                  title="Корзина"
                  route={EPath.Basket}
                  icon={
                    <StyledBadge badgeContent={basket.count} color="secondary">
                      <ShoppingBagOutlinedIcon />
                    </StyledBadge>
                  }
                />
                {!matchesMenu ? <TabletMenu /> : null}
              </Box>
            </Box>
            {matchesMenu ? (
              <Box sx={[{mt: 1.2}, dFlex, justifySB, alignC, {width: '100%'}]}>
                <List sx={list}>
                  {articles.map((article, i) => (
                    <ListItem key={article.link} sx={list.item}>
                      <ListItemButton onClick={(e) => handleClickDesctopMenu(e, i)}>
                        <ListItemText primary={article.title} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <IconTextField
                  label="Введите строку поиска"
                  variant="standard"
                  sx={{width: 410, height: 63}}
                  icon={<SearchIcon />}
                />
                {item && anchorElListItem ? (
                  <DesctopSubMenu anchor={anchorElListItem} close={handleCloseDesctopMenu} item={item} />
                ) : null}
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
