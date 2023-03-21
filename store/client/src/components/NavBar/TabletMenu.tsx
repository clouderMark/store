import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {Box, IconButton, Menu, MenuItem, Button, Collapse, List, ListItemButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import {articles} from './articles';
import {tabletMenu} from './styles/tabletMenu';
import {IconTextField} from '../IconTextField';
import {content} from './content';

const TabletMenu = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<{[key: number]: boolean}>({});

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setOpen({});
  };

  const handleOpenSubList = (id: number) => {
    setOpen((prevState) => ({...prevState, [id]: !prevState[id]}));
  };

  return (
    <Box sx={[tabletMenu.box]}>
      <IconButton
        aria-label="открыть меню"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="success"
        disableRipple={true}
        onClick={handleOpenNavMenu}
      >
        <MenuIcon sx={{fontSize: '40px'}} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={[tabletMenu.fullWidth]}
        marginThreshold={0}
        PaperProps={{
          style: tabletMenu.paper,
        }}
      >
        {articles.map((article, i) => (
          <MenuItem key={article.link} sx={[tabletMenu.fullWidth, tabletMenu.item]}>
            <Button onClick={() => handleOpenSubList(i)} sx={tabletMenu.button}>
              {article.title}
              {open[i] ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Collapse in={open[i]} sx={tabletMenu.submenu}>
              <List sx={tabletMenu.submenu}>
                {content.map((el, i) => (
                  <ListItemButton
                    component={NavLink}
                    to={`/${el.path}`}
                    onClick={handleCloseNavMenu}
                    key={i}
                    sx={tabletMenu.submenu.item}
                  >
                    {el.title}
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </MenuItem>
        ))}
        <MenuItem>
          <IconTextField label="Введите строку поиска" variant="standard" sx={tabletMenu.icon} icon={<SearchIcon />} />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TabletMenu;
