import {Dispatch, SetStateAction} from 'react';
import {Table, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {adminDelete} from '../http/orderAPI';
import {IOrder} from '../types/types';

interface IProps {
  items: IOrder[];
  admin: boolean;
  setItems?: Dispatch<SetStateAction<IOrder[] | null>>,
}

const Orders = (props: IProps) => {
  const handleDeleteClick = (id: number) => {
    adminDelete(id)
      .then((data) => {
        alert(`Заказ №${id} удален`);
        if (props.setItems) {
          props.setItems(props.items.filter((el) => el.id !== data.id));
        }
      })
      .catch((error) => console.error(error));
  };

  if (props.items.length === 0) {
    return <p>Список заказов пустой</p>;
  }

  return (
    <Table bordered hover size="sm" className="mt-3">
      <thead>
        <tr>
          <th>№</th>
          <th>Дата</th>
          <th>Покупатель</th>
          <th>Адрес почты</th>
          <th>Телефон</th>
          <th>Статус</th>
          <th>Сумма</th>
          <th>Подробнее</th>
          {props.admin ? (
            <th>Удалить</th>
          ) : null}
        </tr>
      </thead>
      <tbody>
        {props.items.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.prettyCreatedAt}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.status}</td>
            <td>{item.amount}</td>
            <td>
              {props.admin ? (
                <Link to={`/admin/order/${item.id}`}>Подробнее</Link>
              ) : (
                <Link to={`/user/order/${item.id}`}>Подробнее</Link>
              )}
            </td>
            {props.admin ? (
              <td>
                <Button variant="outline-dark" size="sm" onClick={() => handleDeleteClick(item.id)}>
                  Удалить
                </Button>
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Orders;
