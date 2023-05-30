import {observer} from 'mobx-react-lite';
import {useNavigate} from 'react-router-dom';
import {Dispatch, SetStateAction} from 'react';
import {Button, Box, Typography} from '@mui/material';
import {decrement, increment, remove} from '../../../http/basketAPI';
import {useAppContext} from '../../AppContext';
import {IItem} from '../../../types/types';
import {BasketCard} from '../BasketCard/BasketCard';
import {BasketTable} from '../BasketTable';
import styles from './BasketCardList.module.css';
import {EPath} from '../../../enums/EPath';

interface IProps {
  setFetching: Dispatch<SetStateAction<boolean>>;
}

export const BasketCardList = observer((props: IProps) => {
  const {basket} = useAppContext();
  const {setFetching} = props;

  const navigate = useNavigate();

  const handleIncrement = (id: number) => {
    setFetching(true);
    increment(id)
      .then((data) => {
        basket.products = data.products;
      })
      .finally(() => setFetching(false));
  };

  const handleDecrement = (id: number) => {
    setFetching(true);
    decrement(id)
      .then((data) => {
        basket.products = data.products;
      })
      .finally(() => setFetching(false));
  };

  const handleRemove = (id: number) => {
    setFetching(true);
    remove(id)
      .then((data) => {
        basket.products = data.products;
      })
      .finally(() => setFetching(false));
  };

  return (
    <>
      {basket.count ? (
        <Box className={styles.basketBox}>
          <Box>
            {basket.products.map((item: IItem) => (
              <BasketCard
                item={item}
                handleRemove={handleRemove}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
                key={item.id}
              />
            ))}
          </Box>
          <Box>
            <Box className={styles.makeAnOrder}>
              <Button
                variant="outlined"
                color="success"
                className={styles.makeAnOrderButton}
                onClick={() => navigate(EPath.Checkout)}
              >
                Оформить заказ
              </Button>
            </Box>
            <BasketTable prodAmount={basket.prodAmount} sum={basket.sum} />
          </Box>
        </Box>
      ) : (
        <Typography variant="body1">Ваша корзина пуста</Typography>
      )}
    </>
  );
});
