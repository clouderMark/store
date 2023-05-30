import {observer} from 'mobx-react-lite';
import {createSearchParams, useNavigate} from 'react-router-dom';
import {Box, Pagination, Stack, Typography} from '@mui/material';
import ProductItem from './ProductItem/ProductItem';
import {useAppContext} from './AppContext';
import {IObject, IProductWithProps} from '../types/types.js';
import {dFlex, fWrap, justifySB} from '../styles/flex';
import {EPath} from '../enums/EPath';
import {theme} from '../styles/theme';

const ProductList = observer(() => {
  const {catalog} = useAppContext();
  const navigate = useNavigate();

  const handleClick = (page: number) => {
    catalog.page = page;

    const params: IObject = {};

    if (catalog.industry) params.industry = `${catalog.industry}`;
    if (catalog.solution) params.solution = `${catalog.solution}`;
    if (catalog.area) params.area = `${catalog.area}`;
    if (catalog.page > 1) params.page = `${catalog.page}`;
    navigate({
      pathname: EPath.Shop,
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    <>
      <Box sx={[dFlex, fWrap, justifySB]}>
        {catalog.products.length ? (
          catalog.products.map((item: IProductWithProps) => <ProductItem key={item.id} data={item} />)
        ) : (
          <Typography component="p" sx={{mb: 10}}>
            По вашему запросу ничего не найдено
          </Typography>
        )}
      </Box>
      {catalog.pages > 1 ? (
        <Stack spacing={2} sx={{display: 'flex', alignItems: 'center', mt: 3, mb: 10}}>
          <Pagination
            count={catalog.pages}
            page={catalog.page}
            onChange={(_, value) => handleClick(value)}
            color="secondary"
            sx={{
              '& .MuiPaginationItem-root': {
                color: theme.palette.fourth.main,
              },
            }}
          />
        </Stack>
      ) : null}
    </>
  );
});

export default ProductList;
