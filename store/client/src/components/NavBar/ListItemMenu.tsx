import {NavLink} from 'react-router-dom';
import {Menu, MenuItem, Button} from '@mui/material';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import {listItemMenu} from './styles/listItemMenu';

interface IProps {
  anchor: null | HTMLElement;
  close(): void;
  to: string;
}

const content = ['первый', 'второй', 'первый', 'второй'];

const ListItemMenu = (props: IProps) => (
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
    <MenuItem onClick={props.close} sx={listItemMenu.header.wrapper(content.length)}>
      <Button component={NavLink} to={`/${props.to}`} sx={listItemMenu.header} endIcon={<ArrowForwardIosOutlinedIcon/>}>
        {props.anchor?.textContent}
      </Button>
    </MenuItem>
    {content.map((el, i) => (
      <MenuItem key={i} sx={listItemMenu.item.wrapper}>
        <Button onClick={props.close} sx={listItemMenu.item} endIcon={<ArrowForwardIosOutlinedIcon/>}>
          {el}
        </Button>
      </MenuItem>
    ))}
  </Menu>
);

export default ListItemMenu;
