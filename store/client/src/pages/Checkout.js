import {Navigate} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import {Container, Form, Button, Spinner} from 'react-bootstrap';
import {fetchBasket} from '../http/basketAPI';
import {AppContext} from '../components/AppContext.js';
import {check as checkAuth} from '../http/userAPI';
import {guestCreate, userCreate} from '../http/orderAPI';

const isValid = (input) => {
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
    default: // Do nothing
  }
};

const Checkout = () => {
  const {user, basket} = useContext(AppContext);
  const [fetching, setFetching] = useState(true);

  const [order, setOrder] = useState(null);

  const [value, setValue] = useState({name: '', email: '', phone: '', address: ''});
  const [valid, setValid] = useState({name: null, email: null, phone: null, address: null});

  useEffect(() => {
    // если корзина пуста тут делать нечего
    fetchBasket()
      // eslint-disable-next-line
      .then((data) => (basket.products = data.products))
      .finally(() => setFetching(false));
    checkAuth()
      .then((data) => {
        if (data) {
          user.login(data);
        }
      })
      .catch((error) => user.logout(error));
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

  const handleChange = (event) => {
    setValue({...value, [event.target.name]: event.target.value});
    setValid({...valid, [event.target.name]: isValid(event.target)});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setValue({
      name: event.target.name.value.trim(),
      email: event.target.name.value.trim(),
      phone: event.target.name.value.trim(),
      address: event.target.name.value.trim(),
    });

    setValid({
      name: isValid(event.target.name),
      email: isValid(event.target.email),
      phone: isValid(event.target.phone),
      address: isValid(event.target.address),
    });

    if (valid.name && valid.email && valid.phone && valid.address) {
      let comment = event.target.comment.value.trim();
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
    <Container>
      {basket.count === 0 && <Navigate to="/basket" replace={true} />}
      <h1 className="mb-4 mt-4">Оформление заказа</h1>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Control
          name="name"
          value={value.name}
          onChange={(e) => handleChange(e)}
          isValid={valid.name === true}
          isInvalid={valid.name === false}
          placeholder="Петров Петр"
          className="mb-3"
        />
        <Form.Control
          name="email"
          value={value.email}
          onChange={(e) => handleChange(e)}
          isValid={valid.email === true}
          isInvalid={valid.email === false}
          placeholder="example@mail.by"
          className="mb-3"
        />
        <Form.Control
          name="phone"
          value={value.phone}
          onChange={(e) => handleChange(e)}
          isValid={valid.phone === true}
          isInvalid={valid.phone === false}
          placeholder="+375(25) 123-45-67"
          className="mb-3"
        />
        <Form.Control
          name="address"
          value={value.address}
          onChange={(e) => handleChange(e)}
          isValid={valid.address === true}
          isInvalid={valid.address === false}
          placeholder="Введите адрес доставки..."
          className="mb-3"
        />
        <Form.Control name="comment" className="mb-3" placeholder="Комментрарии к заказу" />
        <Button type="submit">Отправить</Button>
      </Form>
    </Container>
  );
};

export default Checkout;
