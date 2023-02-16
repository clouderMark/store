import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChairIcon from '@mui/icons-material/Chair';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import HouseIcon from '@mui/icons-material/House';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CommentIcon from '@mui/icons-material/Comment';
import {IOrderWithItems} from '../types/types';
import {getStatusText} from './Orders/statusList';

interface IProps {
  data: IOrderWithItems;
  admin: boolean;
}

const Order = (props: IProps) => (
  <>
    <List>
      <ListItem>
        <ListItemIcon><CalendarMonthOutlinedIcon/></ListItemIcon>
        <ListItemText primary={` Дата заказа: ${props.data.prettyCreatedAt}`} />
      </ListItem>
      <ListItem>
        {(() => {
          if (props.data.status === 0) return <ListItemIcon><ChairIcon /></ListItemIcon>;
          if (props.data.status === 1) return <ListItemIcon><WorkHistoryIcon /></ListItemIcon>;
          if (props.data.status === 2) return <ListItemIcon><AirplanemodeActiveIcon /></ListItemIcon>;
        })()}
        <ListItemText
          primary={`Статус заказа: ${getStatusText(props.data.status)}`}
        />
      </ListItem>
    </List>
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>Цена</TableCell>
            <TableCell>Кол-во</TableCell>
            <TableCell>Сумма</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.items.map((item) => (
            <TableRow key={item.id} hover>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.price * item.quantity}</TableCell>
            </TableRow>
          ))}
          <TableRow hover>
            <TableCell colSpan={3}>Итого</TableCell>
            <TableCell>{props.data.amount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

export default Order;
