import {
  Button,
  TableRow,
  TableCell,
} from '@mui/material';
import {buttonText} from './cells';
import {ITableBodyCells} from './types';

export const TableBodyCells = (props: ITableBodyCells): JSX.Element => (
  <>
    {props.items.map((item) => (
      <TableRow key={item.id} hover>
        {props.title === 'goods' && 'industry' in item ? (
          <>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.industry.name}</TableCell>
            <TableCell>{item.brand.name}</TableCell>
            <TableCell>{item.area.name}</TableCell>
            <TableCell># {item.article}</TableCell>
            <TableCell>{item.weight} кг</TableCell>
            <TableCell>{item.price}</TableCell>
          </>
        ) : (
          <TableCell>{item.name}</TableCell>
        )}
        <TableCell>
          <Button variant="outlined" color="success" onClick={() => props.handleUpdateClick(item.id)}>
            {buttonText.edit}
          </Button>
        </TableCell>
        <TableCell>
          <Button variant="outlined" color="error" onClick={() => props.handleDeleteClick(item.id)}>
            {buttonText.delete}
          </Button>
        </TableCell>
      </TableRow>
    ))}
  </>
);
