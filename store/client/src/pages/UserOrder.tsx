import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Container} from '@mui/material';
import Propgress from '../components/LinearDeterminate';
import {userGetOne as getOneOrder} from '../http/orderAPI';
import Order from '../components/Order/Order';
import {IOrderWithItems} from '../types/types';

const UserOrder = () => {
  const {id} = useParams();
  const [order, setOrder] = useState<IOrderWithItems | null>(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOneOrder(+id!)
      .then((data) => setOrder(data))
      .catch((error) => setError(error.response.data.message))
      .finally(() => setFetching(false));
  }, [id]);

  if (fetching) {
    return <Propgress/>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container sx={{mt: 2}}>
      <h1>Заказ № {order?.id}</h1>
      <Order data={order!} admin={false} />
    </Container>
  );
};

export default UserOrder;
