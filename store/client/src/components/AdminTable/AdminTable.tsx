import {
  Container,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@mui/material';
import {IProps} from './types';
import {buttonText} from './cells';
import {getFilteredCells} from './getFilteredCells';
import {titles} from './titles';

export const AdminTable = (props: IProps) => (
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
        <TableContainer component={Paper} sx={{mt: 2}}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {getFilteredCells(props.title).map((cell) => (
                  <TableCell key={cell.field}>{cell.headerName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.items.map((item) => (
                <TableRow key={item.id} hover>
                  {props.title === 'goods' && 'category' in item ? (
                    <>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category.name}</TableCell>
                      <TableCell>{item.brand.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                    </>
                  ) : <TableCell>{item.name}</TableCell>}
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
            </TableBody>
          </Table>
        </TableContainer>
        {props.pagination?.pagination && props.pagination.totalPages > 1 ? (
          props.pagination.pagination()
        ) : null}
      </>
    ) : (
      <Typography variant="body1">Список {titles[props.title][2]} пустой</Typography>
    )}
  </Container>
);
