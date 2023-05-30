import {TableCell} from '@mui/material';

interface IProps {
  cells: {
    field: string;
    value: string;
  } []
}

const TableCells = (props: IProps) => (
  <>
    {props.cells.map((cell) => (
      <TableCell key={cell.field}>{cell.value}</TableCell>
    ))}
  </>
);

export default TableCells;
