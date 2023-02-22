import {useState} from 'react';
import {Container, Typography} from '@mui/material';
import BasketList from '../components/Basket/BasketList';
import Progress from '../components/LinearDeterminate';

const Basket = () => {
  const [fetching, setFetching] = useState(false);

  return (
    <>
      {fetching ? (
        <Progress />
      ) : (
        <Container sx={{mt: 2}}>
          <Typography variant="h4" sx={{mb: 1}}>
            Корзина
          </Typography>
          <BasketList setFetching={setFetching} />
        </Container>
      )}
    </>
  );
};

export default Basket;
