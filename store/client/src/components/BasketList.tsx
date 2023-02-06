import {observer} from 'mobx-react-lite';
import {useNavigate} from 'react-router-dom';
import {useContext, useState} from 'react';
import {Button, Spinner, Table} from 'react-bootstrap';
import {decrement, increment, remove} from '../http/basketAPI';
import {AppContext} from './AppContext.js';
import BasketItem from './BasketItem';
import {IItem} from '../types/types';

const BasketList = observer(() => {
  const {basket} = useContext(AppContext);
  const [fetching, setFetching] = useState(false);

  const navigate = useNavigate();

  const handleIncrement = (id: number) => {
    setFetching(true);
    increment(id)
      .then((data) => { basket.products = data.products; })
      .finally(() => setFetching(false));
  };

  const handleDecrement = (id: number) => {
    setFetching(true);
    decrement(id)
      .then((data) => { basket.products = data.products; })
      .finally(() => setFetching(false));
  };

  const handleRemove = (id: number) => {
    setFetching(true);
    remove(id)
      .then((data) => { basket.products = data.products; })
      .finally(() => setFetching(false));
  };

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <>
      {basket.count ? (
        <>
          <Table bordered hover size="sm" className="mt-3">
            <thead>
              <tr>
                <th>Наименование</th>
                <th>Количество</th>
                <th>Цена</th>
                <th>Сумма</th>
                <th>Удалить</th>
              </tr>
            </thead>
            <tbody>
              {basket.products.map((item: IItem) => (
                <BasketItem
                  key={item.id}
                  increment={handleIncrement}
                  decrement={handleDecrement}
                  remove={handleRemove}
                  {...item}
                />
              ))}
              <tr>
                <th colSpan={3}>Итого</th>
                <th>{basket.sum}</th>
                <th>руб.</th>
              </tr>
            </tbody>
          </Table>
          <Button onClick={() => navigate('/checkout')}>Оформить заказ</Button>
        </>
      ) : (
        <p>Ваша корзина пуста</p>
      )}
    </>
  );
});

export default BasketList;
