import {Card, Button, CardMedia, Box, CardContent, Typography, IconButton} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {IItem} from '../../../types/types';
import styles from './BasketCard.module.css';

interface IProps {
  item: IItem;
  handleRemove(id: number): void;
  handleDecrement(id: number): void;
  handleIncrement(id: number): void;
}

export const BasketCard = (props: IProps) => (
  <Card className={styles.card}>
    <Box className={styles.imgWrapper}>
      <CardMedia component="img" className={styles.img} image={process.env.REACT_APP_IMG_URL! + props.item.image} />
    </Box>
    <CardContent className={styles.cardContent}>
      <Box className={styles.cardContentContent}>
        <Typography variant="body1" component="span" className={styles.cardContentTitle}>
          {props.item.name}
        </Typography>
        <Button color="warning" variant="outlined" onClick={() => props.handleRemove(props.item.id)}>
          delete
        </Button>
      </Box>
      <Typography variant="body1" component="span" className={styles.price}>
        {props.item.price} BYN
      </Typography>
      <Box>
        <IconButton color="secondary" onClick={() => props.handleDecrement(props.item.id)} aria-label="remove one item">
          <RemoveCircleOutlineIcon />
        </IconButton>
        <Typography variant="body1" component="strong" className={styles.quantity}>
          {props.item.quantity}
        </Typography>
        <IconButton
          color="secondary"
          onClick={() => props.handleIncrement(props.item.id)}
          aria-label="add one item more"
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
    </CardContent>
  </Card>
);
