import {TableCell, TableRow} from '@mui/material';
import {ProductCell} from './ProductCell';
import {Board} from '../Board';

interface IProps {
  prodAmount: number;
  sum: number;
}

export const BasketTable = (props: IProps) => (
  <Board
    tableBodyCells={
      <>
        <TableRow hover>
          <TableCell>В корзине</TableCell>
          <ProductCell amount={props.prodAmount} />
        </TableRow>
        <TableRow hover>
          <TableCell>На общую стоимость</TableCell>
          <TableCell>{props.sum} BYN</TableCell>
        </TableRow>
      </>
    }
  />
);
