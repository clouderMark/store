import {Button, TableRow, TableCell} from '@mui/material';
import {buttonText} from '../TableCells/cells';
import {ITableBodyCells} from './types';
import {useAppContext} from '../AppContext';

export const TableBodyCells = (props: ITableBodyCells): JSX.Element => {
  const {catalog} = useAppContext();

  return (
    <>
      {props.items.map((item) => (
        <TableRow key={item.id} hover>
          <TableCell>{item.name}</TableCell>
          {props.title === 'goods' && 'industry' in item ? (
            <>
              <TableCell>{item.industry.name}</TableCell>
              <TableCell>{item.solution.name}</TableCell>
              <TableCell>{item.area.name}</TableCell>
              <TableCell># {item.article}</TableCell>
              <TableCell>{item.weight} кг</TableCell>
              <TableCell>{item.price}</TableCell>
            </>
          ) : null}
          {props.title === 'subindustry' && 'industryId' in item ? (
            <TableCell>
              {`${catalog.industries.find((el) => el.id === item.industryId)?.name}`}
            </TableCell>
          ) : null}
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
};
