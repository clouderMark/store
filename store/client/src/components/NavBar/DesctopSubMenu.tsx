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
  link: string,
  content: string,
}

const DesctopSubMenu = (props: IProps) => (
  <Menu
    open={Boolean(props.anchor)}
    onClose={props.close}
    anchorEl={props.anchor}
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
    <MenuItem onClick={props.close} sx={listItemMenu.header.wrapper(props.items.length)}>
      <Button
        component={NavLink}
        to={`/${props.to}`}
        sx={listItemMenu.header}
        endIcon={<ArrowForwardIosOutlinedIcon />}
      >
        {props.anchor?.textContent}
      </Button>
    </MenuItem>
    {props.items.map((el, i) => (
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

export default DesctopSubMenu;
