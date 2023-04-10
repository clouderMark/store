import {useState} from 'react';
import {Container, Typography} from '@mui/material';
import Progress from '../../components/LinearDeterminate';
import {BasketCardList} from '../../components/BasketCardList/BasketCardList/BasketCardList';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

const Basket = () => {
  const [fetching, setFetching] = useState(false);

  return (
    <>
      {fetching ? (
        <Progress />
      ) : (
        <>
          <Breadcrumbs />
          <Container sx={{mt: 2}}>
            <Typography variant="h4" sx={{mb: 1}}>
              Корзина
            </Typography>
            <BasketCardList setFetching={setFetching} />
          </Container>
        </>
      )}
    </>
  );
};

export default Basket;
