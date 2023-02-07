import {Container, Spinner} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {userGetAll as getAllOrders} from '../http/orderAPI';
import Orders from '../components/Orders';
import {IOrder} from '../types/types';

const UserOrders = () => {
  const [orders, setOrders] = useState<IOrder[] | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getAllOrders()
      .then(
        (data) => setOrders(data),
      )
      .finally(
        () => setFetching(false),
      );
  }, []);

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Ваши заказы</h1>
      <Orders items={orders!} admin={false} />
    </Container>
  );
};

export default UserOrders;
