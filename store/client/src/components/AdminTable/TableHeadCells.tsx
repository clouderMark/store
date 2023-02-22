import {
  TableCell,
} from '@mui/material';
import {getFilteredCells} from './getFilteredCells';
import {ITitle} from './types';

export const TableHeadCells = (props: ITitle): JSX.Element => (
  <>
    {getFilteredCells(props.title).map((cell) => (
      <TableCell key={cell.field}>{cell.headerName}</TableCell>
    ))}
  </>
);
