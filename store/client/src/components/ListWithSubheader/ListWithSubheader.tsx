import {List, ListSubheader, ListItem, ListItemText} from '@mui/material';
import {listWithSubheader as styles} from './styles/listWithSubheader';
import {bullet} from '../commonContent/bullet';

interface IProps {
  subheader: string;
  items: string[];
}

const ListWithSubheader = (props: IProps) => (
  <List
    subheader={
      <ListSubheader component="p" sx={styles.item}>
        {props.subheader}
      </ListSubheader>
    }
  >
    {props.items.map((el, i) => (
      <ListItem disablePadding key={i} sx={[styles.item, bullet]}>
        <ListItemText primary={el} />
      </ListItem>
    ))}
  </List>
);

export default ListWithSubheader;
