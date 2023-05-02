import {NavLink} from 'react-router-dom';
import {Menu, MenuItem, Button} from '@mui/material';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import {listItemMenu} from './styles/listItemMenu';

interface IProps {
  anchor: null | HTMLElement;
  close(): void;
  to: string;
  items: IItems[];
}

interface IItems {
  link: string;
  content: string;
}

const DesctopSubMenu = (props: IProps) => {
  const {anchor, to, items} = props;

  return (
    <Menu
      open={Boolean(anchor)}
      onClose={props.close}
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
      <MenuItem onClick={props.close} sx={listItemMenu.header.wrapper(items.length)}>
        <Button component={NavLink} to={to} sx={listItemMenu.header} endIcon={<ArrowForwardIosOutlinedIcon />}>
          {anchor?.textContent}
        </Button>
      </MenuItem>
      {items.map((el, i) => (
        <MenuItem key={i} sx={listItemMenu.item.wrapper}>
          <Button
            component={NavLink}
            to={`/${el.link}`}
            onClick={props.close}
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
