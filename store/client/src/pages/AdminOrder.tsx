import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Container} from '@mui/material';
import {adminGetOne as getOneOrder} from '../http/orderAPI';
import Order from '../components/Order';
import {IOrderWithItems} from '../types/types';
import Propgress from '../components/LinearDeterminate';

const AdminOrder = () => {
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
    return <Propgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container sx={{mt: 2}}>
      <h1> Заказ № {order?.id}</h1>
      <Order data={order!} admin={true} />
    </Container>
  );
};

export default AdminOrder;
