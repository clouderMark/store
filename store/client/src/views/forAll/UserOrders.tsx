import {useState, useEffect} from 'react';
import {Container, Typography} from '@mui/material';
import {userGetAll as getAllOrders} from '../../http/orderAPI';
import Orders from '../../components/Orders/Orders';
import {IOrder} from '../../types/types';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Loader from '../../components/LinearDeterminate';

const UserOrders = () => {
  const [orders, setOrders] = useState<IOrder[] | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getAllOrders()
      .then((data) => setOrders(data))
      .finally(() => setFetching(false));
  }, []);

  if (fetching) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumbs />
      <Container maxWidth={false} sx={{mb: 10}}>
        <Typography component='h1' sx={{mb: 4, mt: 4, fontSize: '30px'}}>Ваши заказы</Typography>
        <Orders items={orders!} admin={false} />
      </Container>
    </>
  );
};

export default UserOrders;
