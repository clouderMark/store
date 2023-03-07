import {useState} from 'react';
import {Box, IconButton, Menu, MenuItem, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import {articles} from './articles';
import {articleMenu} from './styles/articlesMenu';
import {IconTextField} from '../IconTextField';

const menuStyle = {
  marginTop: '28px',
  boxShadow: '0 0 1px 0 #6f6f6f',
  width: '100%',
  maxWidth: '100%',
};

export const ArticlesMenu = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={[articleMenu.box]}>
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
        sx={[articleMenu.popUpMenu]}
        marginThreshold={0}
        PaperProps={{
          style: menuStyle,
        }}
      >
        {articles.map((article) => (
          <MenuItem key={article.link} onClick={handleCloseNavMenu} sx={[articleMenu.popUpMenu]}>
            <Typography textAlign="center">{article.title}</Typography>
          </MenuItem>
        ))}
        <MenuItem>
          <IconTextField
            label="Введите строку поиска"
            variant="standard"
            sx={articleMenu.icon}
            icon={<SearchIcon />}
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};
