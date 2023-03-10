import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import HouseIcon from '@mui/icons-material/House';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CommentIcon from '@mui/icons-material/Comment';
import {IOrderWithItems} from '../../types/types';

interface IProps {
  data: IOrderWithItems
}

export const ListInfo = (props: IProps) => (
  <List>
    <ListItem>
      <ListItemIcon><EmojiPeopleIcon/></ListItemIcon>
      <ListItemText primary={`Имя, Фамилия: ${props.data.name}`} />
    </ListItem>
    <ListItem>
      <ListItemIcon><MailOutlineIcon/></ListItemIcon>
      <ListItemText primary={`Адрес почты: ${props.data.email}`} />
    </ListItem>
    <ListItem>
      <ListItemIcon><ContactPhoneIcon/></ListItemIcon>
      <ListItemText primary={`Номер телефона: ${props.data.phone}`} />
    </ListItem>
    <ListItem>
      <ListItemIcon><HouseIcon/></ListItemIcon>
      <ListItemText primary={`Адрес доставки: ${props.data.address}`} />
    </ListItem>
    <ListItem>
      <ListItemIcon><CommentIcon/></ListItemIcon>
      <ListItemText primary={`Комментрарии: ${props.data.comment ? props.data.comment : ''}`} />
    </ListItem>
  </List>
);
