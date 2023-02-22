import {observer} from 'mobx-react-lite';
import {useNavigate} from 'react-router-dom';
import {Dispatch, SetStateAction} from 'react';
import {TableCell, TableRow, Typography, Button} from '@mui/material';
import {decrement, increment, remove} from '../../http/basketAPI';
import {useAppContext} from '../AppContext';
import BasketItem from './BasketItem';
import {IItem} from '../../types/types';
import {cells} from './cells';
import {Board} from '../Board';

interface IProps {
  setFetching: Dispatch<SetStateAction<boolean>>
}

const BasketList = observer((props: IProps) => {
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

  const HeadCells = () => (
    <>
      {cells.map((cell) => (
        <TableCell key={cell.field}>{cell.headerName}</TableCell>
      ))}
    </>
  );

  const BodyCells = () => (
    <>
      {basket.products.map((item: IItem) => (
        <BasketItem
          key={item.id}
          increment={handleIncrement}
          decrement={handleDecrement}
          remove={handleRemove}
          {...item}
        />
      ))}
      <TableRow>
        <TableCell colSpan={3}>Итого</TableCell>
        <TableCell>{basket.sum}</TableCell>
        <TableCell>руб.</TableCell>
      </TableRow>
    </>
  );

  return (
    <>
      {basket.count ? (
        <>
          <Board tableHeadCells={HeadCells} tableBodyCells={BodyCells}/>
          <Button variant='outlined' color='success' onClick={() => navigate('/checkout')}>Оформить заказ</Button>
        </>
      ) : (
        <Typography variant="body1">Ваша корзина пуста</Typography>
      )}
    </>
  );
});

export default BasketList;
