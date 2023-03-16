import {useState, useEffect} from 'react';
import {Container, Typography, TableCell, Button, TableRow} from '@mui/material';
import {Board} from '../components/Board';
import Progress from '../components/LinearDeterminate';
import {adminGetAllSubscriptions} from '../http/subscription';
import {ISubscribe} from '../types/types';

const content: IContent = {
  tableHead: ['№', 'Подписавшиеся', 'Дата подписки'],
};

interface IContent {
  tableHead: string[],
}

const AdminSubscription = () => {
  const [subscriptions, setSubscriptions] = useState<null | ISubscribe[]>(null);
  const [fetching, setFetching] = useState(true);

  const handleDeleteClick = (id: number) => {
    console.log(id);
  };

  useEffect(() => {
    adminGetAllSubscriptions()
      .then((data) => {
        setSubscriptions(data);
      })
      .catch(console.error)
      .finally(() => setFetching(false));
  }, []);

  const TableHeadCells = () => (
    <>
      {content.tableHead.map((el, i) => (
        <TableCell key={i}>{el}</TableCell>
      ))}
    </>
  );

  const BodyCells = () => (
    <>
      {subscriptions?.map((item) => (
        <TableRow key={item.id} hover>
          <TableCell scope="row">{item.id}</TableCell>
          <TableCell>{item.email}</TableCell>
          <TableCell>{item.createdAt}</TableCell>
          <TableCell>
            <Button variant="outlined" onClick={() => handleDeleteClick(item.id)} color="warning">
              Удалить
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  if (fetching) {
    return <Progress />;
  }

  return (
    <Container sx={{mt: 2}} maxWidth={false}>
      <Typography variant="h4">Все подписки</Typography>
      <Board tableHeadCells={TableHeadCells} tableBodyCells={BodyCells} />
    </Container>
  );
};

export default AdminSubscription;
