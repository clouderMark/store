import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChairIcon from '@mui/icons-material/Chair';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import {getStatusText} from '../Orders/statusList';
import {IOrderWithItems} from '../../types/types';

interface IProps {
  data: IOrderWithItems;
}

export const StatusList = (props: IProps) => (
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
);
