import {TableCell} from '@mui/material';
import {cells} from './cells';

export const TableHeadCells = (): JSX.Element => (
  <>
    {cells.map((cell) => (
      <TableCell key={cell.field}>{cell.headerName}</TableCell>
    ))}
  </>
);
