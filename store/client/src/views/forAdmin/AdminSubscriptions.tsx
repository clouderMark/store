import {useState, useEffect} from 'react';
import {Container, Typography, TableCell, Button, TableRow} from '@mui/material';
import {Board} from '../../components/Board';
import Progress from '../../components/LinearDeterminate';
import {adminGetAllSubscriptions, adminDeleteSubscription} from '../../http/subscription';
import {ISubscribe} from '../../types/types';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import TableCells from '../../components/TableCells/TableCells';
import {adminSubscriptionCells} from '../../components/TableCells/cells';
import AlertLine from '../../components/AlertLine/AlertLine';

const AdminSubscription = () => {
  const [subscriptions, setSubscriptions] = useState<null | ISubscribe[]>(null);
  const [fetching, setFetching] = useState(true);
  const [alertOnDelete, setAlertOnDelete] = useState<false | string>(false);

  const handleDeleteClick = (id: number) => {
    adminDeleteSubscription(id)
      .then((data) => {
        setAlertOnDelete(`Подписчик с email: ${data.email} удален`);
        setTimeout(() => {
          setAlertOnDelete(false);
        }, 5000);
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

  if (fetching) {
    return <Progress />;
  }

  return (
    <>
      <Breadcrumbs />
      <Container sx={{mt: 2, mb: 10}} maxWidth={false}>
        <Typography variant="h4">Все подписки</Typography>
        <Board
          tableHeadCells={<TableCells cells={adminSubscriptionCells} />}
          tableBodyCells={
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
          }
        />
      </Container>
      {alertOnDelete ? <AlertLine content={alertOnDelete} success={Boolean(alertOnDelete)} /> : null}
    </>
  );
};

export default AdminSubscription;
