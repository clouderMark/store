import {Container} from '@mui/material';
import {useState, useEffect} from 'react';
import {adminGetAll as getAllOrders} from '../http/orderAPI';
import Progress from '../components/LinearDeterminate';
import Orders from '../components/Orders';
import {IOrder} from '../types/types';

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
    <Container sx={{mt: 2}}>
      <h1>Все заказы</h1>
      <Orders items={orders!} setItems={setOrders} admin={true}/>
    </Container>
  );
};

export default AdminOrders;
