import {useState, useEffect} from 'react';
import {Container, Typography, TableCell, Button, TableRow} from '@mui/material';
import {Board} from '../../components/Board';
import Progress from '../../components/LinearDeterminate';
import {adminGetAllSubscriptions, adminDeleteSubscription} from '../../http/subscription';
import {ISubscribe} from '../../types/types';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import TableCells from '../../components/TableCells/TableCells';
import {adminSubscriptionCells} from '../../components/TableCells/cells';

const AdminSubscription = () => {
  const [subscriptions, setSubscriptions] = useState<null | ISubscribe[]>(null);
  const [fetching, setFetching] = useState(true);

  const handleDeleteClick = (id: number) => {
    adminDeleteSubscription(id)
      .then((data) => {
        alert(`Подписчик с email: ${data.email} удален`);
        if (subscriptions) {
          setSubscriptions(subscriptions?.filter((el) => el.id !== data.id));
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    adminGetAllSubscriptions()
      .then((data) => {
        setSubscriptions(data);
      })
      .catch(console.error)
      .finally(() => setFetching(false));
  }, []);

  const BodyCells = () => (
    <>
      {subscriptions?.map((item) => (
        <TableRow key={item.id} hover>
          <TableCell scope="row">{item.id}</TableCell>
          <TableCell>{item.email}</TableCell>
          <TableCell>{item.createdAt.split('T')[0]}</TableCell>
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
    <>
      <Breadcrumbs />
      <Container sx={{mt: 2}} maxWidth={false}>
        <Typography variant="h4">Все подписки</Typography>
        <Board tableHeadCells={<TableCells cells={adminSubscriptionCells} />} tableBodyCells={BodyCells} />
      </Container>
    </>
  );
};

export default AdminSubscription;
