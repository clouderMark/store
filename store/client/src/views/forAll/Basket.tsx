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
          <Container sx={{mb: 15}} maxWidth={false}>
            <Typography variant="h4" sx={{mb: 4, mt: 4, fontSize: '30px'}}>
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
