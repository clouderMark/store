import {NavLink} from 'react-router-dom';
import {Menu, MenuItem, Button} from '@mui/material';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import {listItemMenu} from './styles/listItemMenu';
import {IArticle} from './types';

interface IProps {
  anchor: HTMLElement;
  close(): void;
  item: IArticle;
}

const DesctopSubMenu = (props: IProps) => {
  const {anchor, item, close} = props;

  return (
    <Menu
      open={Boolean(anchor)}
      onClose={close}
      anchorEl={anchor}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      marginThreshold={0}
      PaperProps={{
        style: listItemMenu.paper,
      }}
      MenuListProps={{
        'aria-labelledby': 'lock-button',
        role: 'listbox',
      }}
      sx={listItemMenu.list}
    >
      <MenuItem onClick={close} sx={listItemMenu.header.wrapper(item.list.length)}>
        <Button component={NavLink} to={item.link} sx={listItemMenu.header} endIcon={<ArrowForwardIosOutlinedIcon />}>
          {anchor.textContent}
        </Button>
      </MenuItem>
      {item.list.map((el, i) => (
        <MenuItem key={i} sx={listItemMenu.item.wrapper}>
          <Button
            component={NavLink}
            to={`${item.link}/${el.link}`}
            onClick={close}
            sx={listItemMenu.item}
            endIcon={<ArrowForwardIosOutlinedIcon />}
          >
            {el.content}
          </Button>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default DesctopSubMenu;
