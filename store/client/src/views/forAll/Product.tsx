import {useEffect, useState} from 'react';
import {Box, Button, Container, TableCell, TableRow, Typography} from '@mui/material';
import {useParams} from 'react-router-dom';
import {useAppContext} from '../../components/AppContext';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import {append} from '../../http/basketAPI';
import {fetchOneProduct, fetchProdRating} from '../../http/catalogAPI';
import {IProductWithProps, IRating} from '../../types/types';
import Loader from '../../components/LinearDeterminate';
import ContainerWithTwoColumns from '../../components/ContainerWithTwoColumns/ContainerWithTwoColumns';
import {Board} from '../../components/Board';

const Product = () => {
  const id: number = Number(useParams().id);
  const {basket, catalog} = useAppContext();
  const [product, setProduct] = useState<IProductWithProps | null>(null);
  const [rating, setRating] = useState<IRating | null>(null);

  useEffect(() => {
    fetchOneProduct(id).then((data) => {
      setProduct(data);
      catalog.products = [data];
    });
    fetchProdRating(id).then((data) => setRating(data));
  }, [id]);

  const handleClick = (productId: number) => {
    append(productId).then((data) => {
      basket.products = data.products;
    });
  };

  if (!product) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumbs />
      <ContainerWithTwoColumns
        firstColumn={
          <>
            {product.image ? (
              <Box component="img" width={300} height={300} src={process.env.REACT_APP_IMG_URL + product.image} />
            ) : (
              <Box component="img" width={300} height={300} src="http://via.placeholder.com/300" />
            )}
          </>
        }
        secondColumn={
          <>
            <Typography component="h1" sx={{mb: 4, mt: 4, fontSize: '30px'}}>
              {product.name}
            </Typography>
            <Typography component="h3" sx={{mb: 4, mt: 4, fontSize: '25px'}}>
              {product.price}.00 руб
            </Typography>
            <Typography>Решение: {product.solution.name}</Typography>
            <Typography>Индустрия: {product.industry.name}</Typography>
            <Box>
              {rating ? (
                <Typography>
                  Рейтинг: {rating.rating}, голосов {rating.votes}
                </Typography>
              ) : (
                <>Загрузка рейтинга</>
              )}
            </Box>
            <Button color="first" variant="contained" sx={{mt: 3}} onClick={() => handleClick(+product.id)}>
              Добавить в корзину
            </Button>
          </>
        }
      />
      {product.props.length ? (
        <Container maxWidth={false} sx={{mb: 10}}>
          <Board
            tableHeadCells={<TableCell colSpan={2}>Характеристики</TableCell>}
            tableBodyCells={
              <>
                {product.props.map((el) => (
                  <TableRow key={el.id}>
                    <TableCell>{el.name}</TableCell>
                    <TableCell>{el.value}</TableCell>
                  </TableRow>
                ))}
              </>
            }
          />
        </Container>
      ) : null}
    </>
  );
};

export default Product;
