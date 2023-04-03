import {Box, List, ListItem} from '@mui/material';
import CardItem from '../CardItem/CardItem';
import {branchesList as styles} from './styles/branchesList';

interface IProps {
  data: {
    to: string;
    // eslint-disable-next-line
    image: any;
    name: string;
  }[];
}

const BranchesList = (props: IProps) => (
  <Box sx={styles}>
    <List sx={styles.list}>
      {props.data.map((el, i) => (
        <ListItem sx={styles.list.item} key={i}>
          <CardItem to={el.to} image={el.image} name={el.name} />
        </ListItem>
      ))}
    </List>
  </Box>
);

export default BranchesList;
