import {TableCell} from '@mui/material';

interface IProps {
  amount: number;
}

export const ProductCell = (props: IProps) => (
  <TableCell>
    {props.amount} товар
    {(() => {
      let result = '';

      if (props.amount > 1 && props.amount <= 4) {
        result = 'а';
      } else if (props.amount >= 4) {
        result = 'ов';
      }

      return result;
    })()}
  </TableCell>
);
