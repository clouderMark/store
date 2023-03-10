import {
  TableCell,
} from '@mui/material';
import {headCells} from './headCells';

export const TableHeadCells = (props: boolean): JSX.Element => (
  <>
    {headCells.map((headCell) => (
      <TableCell key={headCell.id}>{headCell.label}</TableCell>
    ))}
    {props ? <TableCell>Удалить</TableCell> : null}
  </>
);
