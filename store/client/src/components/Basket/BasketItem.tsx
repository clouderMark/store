import {TableCell, TableRow, Button, IconButton} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {IItem} from '../../types/types';

interface IProps extends IItem {
  decrement: (id: number) => void;
  increment: (id: number) => void;
  remove: (id: number) => void;
}

const BasketItem = (props: IProps) => (
  <TableRow>
    <TableCell>{props.name}</TableCell>
    <TableCell>
      <IconButton color='secondary' onClick={() => props.decrement(props.id)}>
        <RemoveCircleOutlineIcon/>
      </IconButton>
      {' '}<strong>{props.quantity}</strong>{' '}
      <IconButton color='success' onClick={() => props.increment(props.id)}>
        <AddCircleOutlineIcon/>
      </IconButton>
    </TableCell>
    <TableCell>{props.price}</TableCell>
    <TableCell>{props.price * props.quantity}</TableCell>
    <TableCell>
      <Button color='warning' variant='outlined' onClick={() => props.remove(props.id)}>
        Удалить
      </Button>
    </TableCell>
  </TableRow>
);

export default BasketItem;
