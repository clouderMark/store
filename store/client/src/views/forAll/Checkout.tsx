import {Navigate} from 'react-router-dom';
import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';
import {Box, Button, Container, TextField, Typography} from '@mui/material';
import {fetchBasket} from '../../http/basketAPI';
import {useAppContext} from '../../components/AppContext';
import {check as checkAuth} from '../../http/userAPI';
import {guestCreate, userCreate} from '../../http/orderAPI';
import {IOrderWithItems} from '../../types/types';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Loader from '../../components/LinearDeterminate';
import {EPath} from '../../enums/EPath';

enum EName {
  name = 'name',
  email = 'email',
  phone = 'phone',
  address = 'address',
  comment = 'comment',
}

interface IDefaultValid {
  name: null | boolean;
  email: null | boolean;
  phone: null | boolean;
  address: null | boolean;
}

const isValid = (input: HTMLInputElement): boolean => {
  let pattern;

  switch (input.name) {
    case EName.name:
      pattern = /^[-а-я]{2,}( [-а-я]{2,}){1,2}$/i;

      return pattern.test(input.value.trim());
    case EName.email:
      pattern = /^[-_.a-z]+@([-a-z]+\.){1,2}[a-z]+$/i;

      return pattern.test(input.value.trim());
    case EName.phone:
      pattern = /^\+375\([0-9]{2}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/i;

      return pattern.test(input.value.trim());
    case EName.address:
      return input.value.trim() !== '';
    default:
      return false;
  }
};

const defaultValid: IDefaultValid = {
  [EName.name]: null,
  [EName.email]: null,
  [EName.phone]: null,
  [EName.address]: null,
};

const defaultValue = {[EName.name]: '', [EName.email]: '', [EName.phone]: '', [EName.address]: ''};

const Checkout = () => {
  const {user, basket} = useAppContext();
  const [fetching, setFetching] = useState(true);

  const [order, setOrder] = useState<null | IOrderWithItems>(null);

  const [value, setValue] = useState(defaultValue);
  const [valid, setValid] = useState<IDefaultValid>(defaultValid);
  const [comment, setComment] = useState('');

  useEffect(() => {
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
    return <Loader />;
  }

  if (order) {
    return (
      <Container maxWidth={false} sx={{mb: 10}}>
        <Typography component="h1" sx={{mb: 4, mt: 4, fontSize: '30px'}}>
          Заказ оформлен
        </Typography>
        <Typography>Наш менеджер скоро позвонит для уточнения деталей</Typography>
      </Container>
    );
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === EName.comment) {
      setComment(event.target.value);
    } else {
      setValue({...value, [event.target.name]: event.target.value});
      setValid({...valid, [event.target.name]: isValid(event.target)});
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (valid.name && valid.email && valid.phone && valid.address) {
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
      <Container maxWidth={false}>
        {basket.count === 0 && <Navigate to={EPath.Basket} replace={true} />}
        <Typography component="h1" sx={{mb: 4, mt: 4, fontSize: '30px'}}>
          Оформление заказа
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{display: 'flex', flexDirection: 'column', m: '0 auto', mb: 10}}
        >
          <TextField
            name={EName.name}
            value={value[EName.name]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            error={valid[EName.name] === false}
            color={valid[EName.name] ? 'success' : 'primary'}
            placeholder="Петров Петр"
            sx={{mb: 3}}
          />
          <TextField
            name={EName.email}
            value={value[EName.email]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            error={valid[EName.email] === false}
            color={valid[EName.email] ? 'success' : 'primary'}
            placeholder="example@mail.by"
            sx={{mb: 3}}
          />
          <TextField
            name={EName.phone}
            value={value[EName.phone]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            error={valid[EName.phone] === false}
            color={valid[EName.phone] ? 'success' : 'primary'}
            placeholder="+375(25) 123-45-67"
            sx={{mb: 3}}
          />
          <TextField
            name={EName.address}
            value={value[EName.address]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            error={valid[EName.address] === false}
            color={valid[EName.address] ? 'success' : 'primary'}
            placeholder="Введите адрес доставки..."
            sx={{mb: 3}}
          />
          <TextField
            name={EName.comment}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            className="mb-3"
            placeholder="Комментрарии к заказу"
          />
          <Button color="first" variant="contained" type="submit">
            Отправить
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Checkout;
