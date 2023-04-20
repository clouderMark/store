import {Box, List, ListItem} from '@mui/material';
import CardItem from '../CardItem/CardItem';
import {cardList as styles} from './styles/cardList';

interface IProps {
  data: {
    id: number;
    cardImage: string | null;
    name: string;
  }[];
}

const CardList = (props: IProps) => (
  <Box sx={styles}>
    <List sx={styles.list}>
      {props.data.map((el, i) => (
        <ListItem sx={styles.list.item} key={i}>
          <CardItem
            to={`${el.id}`}
            image={el.cardImage}
            name={el.name}
          />
        </ListItem>
      ))}
    </List>
  </Box>
);

export default CardList;
