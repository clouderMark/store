import {Navigate} from 'react-router-dom';
import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';
import {Container, Form, Button, Spinner} from 'react-bootstrap';
import {fetchBasket} from '../../http/basketAPI';
import {useAppContext} from '../../components/AppContext';
import {check as checkAuth} from '../../http/userAPI';
import {guestCreate, userCreate} from '../../http/orderAPI';
import {IOrderWithItems} from '../../types/types';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

const isValid = (input: HTMLInputElement): boolean => {
  let pattern;

  switch (input.name) {
    case 'name':
      pattern = /^[-а-я]{2,}( [-а-я]{2,}){1,2}$/i;

      return pattern.test(input.value.trim());
    case 'email':
      pattern = /^[-_.a-z]+@([-a-z]+\.){1,2}[a-z]+$/i;

      return pattern.test(input.value.trim());
    case 'phone':
      pattern = /^\+375\([0-9]{2}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/i;

      return pattern.test(input.value.trim());
    case 'address':
      return input.value.trim() !== '';
    default:
      return false;
  }
};

const defaultValid = {name: null, email: null, phone: null, address: null};
const defaultValue = {name: '', email: '', phone: '', address: ''};

interface IDefaultValid {
  name: null | boolean;
  email: null | boolean;
  phone: null | boolean;
  address: null | boolean;
}

const Checkout = () => {
  const {user, basket} = useAppContext();
  const [fetching, setFetching] = useState(true);

  const [order, setOrder] = useState<null | IOrderWithItems>(null);

  const [value, setValue] = useState(defaultValue);
  const [valid, setValid] = useState<IDefaultValid>(defaultValid);

  useEffect(() => {
    // если корзина пуста тут делать нечего
    fetchBasket()
      .then((data) => {
        basket.products = data.products;
      })
      .finally(() => setFetching(false));
    checkAuth()
      .then((data) => {
        if (data) {
          user.login(data);
        }
      })
      .catch(() => user.logout());
  }, []);

  if (fetching) {
    // лоадер пока получается корзина
    return <Spinner animation="border" />;
  }

  if (order) {
    // заказ был успешно отправлен
    return (
      <Container>
        <h1 className="mb-4 mt-4">Заказ оформлен</h1>
        <p>Наш менеджер скоро позвонит для уточнения деталей</p>
      </Container>
    );
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue({...value, [event.target.name]: event.target.value});
    setValid({...valid, [event.target.name]: isValid(event.target)});
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = event.currentTarget.elements.namedItem('name') as HTMLInputElement;
    const email = event.currentTarget.elements.namedItem('email') as HTMLInputElement;
    const phone = event.currentTarget.elements.namedItem('phone') as HTMLInputElement;
    const address = event.currentTarget.elements.namedItem('address') as HTMLInputElement;

    setValue({
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      address: address.value.trim(),
    });

    setValid({
      name: isValid(name),
      email: isValid(email),
      phone: isValid(phone),
      address: isValid(address),
    });

    if (valid.name && valid.email && valid.phone && valid.address) {
      let comment: string | null = (event.currentTarget.elements.namedItem('comment') as HTMLInputElement).value.trim();
      // eslint-disable-next-line
      comment = comment ? comment : null;
      // форма заполнена правильно, можно отправлять данные
      const body = {...value, comment};
      const create = user.isAuth ? userCreate : guestCreate;

      create(body).then((data) => {
        setOrder(data);
        basket.products = [];
      });
    }
  };

  return (
    <>
      <Breadcrumbs />
      <Container>
        {basket.count === 0 && <Navigate to="/basket" replace={true} />}
        <h1 className="mb-4 mt-4">Оформление заказа</h1>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Control
            name="name"
            value={value.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            isValid={valid.name === true}
            isInvalid={valid.name === false}
            placeholder="Петров Петр"
            className="mb-3"
          />
          <Form.Control
            name="email"
            value={value.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            isValid={valid.email === true}
            isInvalid={valid.email === false}
            placeholder="example@mail.by"
            className="mb-3"
          />
          <Form.Control
            name="phone"
            value={value.phone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            isValid={valid.phone === true}
            isInvalid={valid.phone === false}
            placeholder="+375(25) 123-45-67"
            className="mb-3"
          />
          <Form.Control
            name="address"
            value={value.address}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            isValid={valid.address === true}
            isInvalid={valid.address === false}
            placeholder="Введите адрес доставки..."
            className="mb-3"
          />
          <Form.Control name="comment" className="mb-3" placeholder="Комментрарии к заказу" />
          <Button type="submit">Отправить</Button>
        </Form>
      </Container>
    </>
  );
};

export default Checkout;
