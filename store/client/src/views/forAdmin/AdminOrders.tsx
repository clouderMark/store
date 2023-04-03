import {Container, Typography} from '@mui/material';
import {useState, useEffect} from 'react';
import {adminGetAll as getAllOrders} from '../../http/orderAPI';
import Progress from '../../components/LinearDeterminate';
import Orders from '../../components/Orders/Orders';
import {IOrder} from '../../types/types';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

const AdminOrders = () => {
  const [orders, setOrders] = useState<IOrder[] | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getAllOrders()
      .then((data) => setOrders(data))
      .finally(() => setFetching(false));
  }, []);

  if (fetching) {
    return <Progress />;
  }

  return (
    <>
      <Breadcrumbs />
      <Container sx={{mt: 2}}>
        <Typography variant="h4">Все заказы</Typography>
        <Orders items={orders!} setItems={setOrders} admin={true} />
      </Container>
    </>
  );
};

export default AdminOrders;
