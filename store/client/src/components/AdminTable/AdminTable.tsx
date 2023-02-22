import {
  Container,
  Typography,
  Button,
} from '@mui/material';
import {IProps} from './types';
import {titles} from './titles';
import {Board} from '../Board';
import {TableHeadCells} from './TableHeadCells';
import {TableBodyCells} from './TableBodyCells';

export const AdminTable = (props: IProps) => {
  const HeadCells = () => TableHeadCells(props);

  const TableCells = () => TableBodyCells(props);

  return (
    <Container sx={{mt: 2}}>
      <Typography variant="h4" sx={{mb: 1}}>
        {titles[props.title][0]}
      </Typography>
      <Button variant="outlined" onClick={() => props.handleCreateClick()}>
        Создать {titles[props.title][1]}
      </Button>
      {props.children.map((child) => child())}
      {props.items.length > 0 ? (
        <>
          <Board tableHeadCells={HeadCells} tableBodyCells={TableCells} />
          {props.pagination?.pagination && props.pagination.totalPages > 1 ? props.pagination.pagination() : null}
        </>
      ) : (
        <Typography variant="body1">Список {titles[props.title][2]} пустой</Typography>
      )}
    </Container>
  );
};
