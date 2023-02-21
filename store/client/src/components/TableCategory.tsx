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
import {ICatalogItem} from '../types/types';

const titles: {[key: string]: string[]} = {
  бренды: ['Бренды', 'бренд', 'брендов'],
  категории: ['Категории', 'категорию', 'категорий'],
};

interface IProps {
  title: 'бренды' | 'категории';
  child(): JSX.Element;
  handleCreateClick():void;
  items: ICatalogItem[];
  handleUpdateClick(id: number): void;
  handleDeleteClick(id: number): void;
}

export const TableCategory = (props: IProps) => (
  <Container sx={{mt: 2}}>
    <Typography variant="h4" sx={{mb: 1}}>
      {titles[props.title][0]}
    </Typography>
    <Button variant="outlined" onClick={() => props.handleCreateClick()}>
      Создать {titles[props.title][1]}
    </Button>
    {props.child ? props.child() : null}
    {props.items.length > 0 ? (
      <TableContainer component={Paper} sx={{mt: 2}}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Редактировать</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="success" onClick={() => props.handleUpdateClick(item.id)}>
                    Редактировать
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="error" onClick={() => props.handleDeleteClick(item.id)}>
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <Typography variant="body1">Список {titles[props.title][2]} пустой</Typography>
    )}
  </Container>
);
