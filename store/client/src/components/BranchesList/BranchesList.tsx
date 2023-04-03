import {Box, List, ListItem} from '@mui/material';
import CardItem from '../CardItem/CardItem';
import {branchesList as styles} from './styles/branchesList';

const content = [
  {
    image: false,
    to: '/asdf',
    name: '123',
  },
  {
    image: false,
    to: '/asdf',
    name: '123',
  },
  {
    image: false,
    to: '/asdf',
    name: '123',
  },
  {
    image: false,
    to: '/asdf',
    name: '123',
  },
  {
    image: false,
    to: '/asdf',
    name: '123',
  },
  {
    image: false,
    to: '/asdf',
    name: '123',
  },
];

const BranchesList = () => (
  <Box sx={styles}>
    <List sx={styles.list}>
      {content.map((el, i) => (
        <ListItem
          sx={styles.list.item}
          key={i}
        >
          <CardItem to={el.to} image={el.image} name={el.name} />
        </ListItem>
      ))}
    </List>
  </Box>
);

export default BranchesList;
