import {
  TableRow,
  TableCell,
} from '@mui/material';
import {IOrderWithItems} from '../../types/types';

export const TableBodyCells = (props: IOrderWithItems): JSX.Element => (
  <>
    {props.items.map((item) => (
      <TableRow key={item.id} hover>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.price}</TableCell>
        <TableCell>{item.quantity}</TableCell>
        <TableCell>{item.price * item.quantity}</TableCell>
      </TableRow>
    ))}
    <TableRow hover>
      <TableCell colSpan={3}>Итого</TableCell>
      <TableCell>{props.amount}</TableCell>
    </TableRow>
  </>
);
