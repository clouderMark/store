import React, {Dispatch, SetStateAction} from 'react';
import {Table, Button, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {adminDelete, updateProductStatus} from '../http/orderAPI';
import {IOrder} from '../types/types';

interface IProps {
  items: IOrder[];
  admin: boolean;
  setItems?: Dispatch<SetStateAction<IOrder[] | null>>;
}

const Orders = (props: IProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>, id: number) => {
    const data = new FormData();

    data.append('status', e.target.value);
    updateProductStatus(id, data)
      .then((data) => {
        if (props.setItems) {
          props.setItems(props.items.map((el) => {
            if (el.id === id) el.status = data.status;

            return el;
          }));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
          {props.admin ? <th>Удалить</th> : null}
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
            <td>
              {props.admin ? (
                <Form.Select
                  name="status"
                  value={item.status}
                  onChange={(e) => handleInputChange(e, item.id)}
                >
                  <option value="0">Новый</option>
                  <option value="1">В работе</option>
                  <option value="2">Завершен</option>
                </Form.Select>
              ) : ((() => {
                let status = 'Завершен';

                if (item.status === 0) {
                  status = 'Новый';
                } else if (item.status === 1) {
                  status = 'В работе';
                }

                return status;
              }
              ))()}
            </td>
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
