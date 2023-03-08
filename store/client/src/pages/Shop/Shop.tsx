import {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {useLocation, useSearchParams, createSearchParams, useNavigate} from 'react-router-dom';
import {Container, Box, CircularProgress, Button} from '@mui/material';
import CategoryBar from '../../components/CategoryBar';
import BrandBar from '../../components/BrandBar';
import AreaBar from '../../components/AreaBar';
import ProductList from '../../components/ProductList';
import {useAppContext} from '../../components/AppContext';
import {fetchAllProducts, fetchCategories, fetchBrands, fetchAreas} from '../../http/catalogAPI';
import {button} from './styles';
import {SearchBar} from './SearchBar';

const getSearchParams = (
  searchParams: URLSearchParams,
): {
  brand: number[];
  page: null | number;
  area: number[];
  category: number[];
} => {
  let category: string | null | number | number[] = searchParams.get('category');

  if (category && /[1-9][0-9]*/.test(category)) {
    category = category.split(',').map((el) => +el);
  } else {
    category = [];
  }

  let brand: string | null | number | number[] = searchParams.get('brand');

  if (brand && /[1-9][0-9]*/.test(brand)) {
    brand = brand.split(',').map((el) => +el);
  } else {
    brand = [];
  }

  let area: string | null | number | number[] = searchParams.get('area');

  if (area && /[1-9][0-9]*/.test(area)) {
    area = area.split(',').map((el) => +el);
  } else {
    area = [];
  }

  let page: string | null | number = searchParams.get('page');

  if (page && /[1-9][0-9]*/.test(page)) {
    page = parseInt(page);
  } else {
    page = null;
  }

  return {category, brand, area, page};
};

const Shop = observer(() => {
  const {catalog} = useAppContext();

  const [categoriesFetching, setCategoriesFetching] = useState(true);
  const [brandsFetching, setBrandsFetching] = useState(true);
  const [areasFetching, setAreasFetching] = useState(true);
  const [productsFetching, setProductsFetching] = useState(true);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleClick = () => {
    catalog.brand = [];
    catalog.category = [];
    catalog.area = [];

    navigate({
      pathname: '/shop',
      search: `?${createSearchParams('')}`,
    });
  };

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        catalog.categories = data;
      })
      .finally(() => setCategoriesFetching(false));
    fetchBrands()
      .then((data) => {
        catalog.brands = data;
      })
      .finally(() => setBrandsFetching(false));
    fetchAreas()
      .then((data) => {
        catalog.areas = data;
      })
      .finally(() => setAreasFetching(false));

    const {category, brand, area, page} = getSearchParams(searchParams);

    catalog.category = category;
    catalog.brand = brand;
    catalog.area = area;
    catalog.page = page ?? 1;

    fetchAllProducts(
      catalog.category.length ? catalog.category : null,
      catalog.brand.length ? catalog.brand : null,
      catalog.area.length ? catalog.area : null,
      catalog.page,
      catalog.limit,
    )
      .then((data) => {
        catalog.products = data.rows;
        catalog.count = data.count;
      })
      .finally(() => setProductsFetching(false));
  }, []);

  useEffect(() => {
    const {category, brand, area, page} = getSearchParams(searchParams);

    if (category.length || brand.length || area.length || page) {
      if (category.length !== catalog.category.length) {
        catalog.category = category;
      }

      if (brand.length !== catalog.brand.length) {
        catalog.brand = brand;
      }

      if (area.length !== catalog.area.length) {
        catalog.area = area;
      }

      if (page !== catalog.page) {
        catalog.page = page ?? 1;
      }
    } else {
      catalog.category = [];
      catalog.brand = [];
      catalog.area = [];
      catalog.page = 1;
    }
  }, [location.search]);

  useEffect(() => {
    setProductsFetching(true);
    fetchAllProducts(
      catalog.category.length ? catalog.category : null,
      catalog.brand.length ? catalog.brand : null,
      catalog.area.length ? catalog.area : null,
      catalog.page,
      catalog.limit,
    )
      .then((data) => {
        catalog.products = data.rows;
        catalog.count = data.count;
      })
      .finally(() => setProductsFetching(false));
  }, [catalog.category, catalog.brand, catalog.area, catalog.page]);

  return (
    <Container maxWidth={false}>
      <SearchBar />
      <Box sx={{display: 'flex'}}>
        <Box sx={{display: 'flex', flexDirection: 'column', minWidth: '358px'}}>
          {categoriesFetching ? <CircularProgress color="success" /> : <CategoryBar />}
          {brandsFetching ? <CircularProgress color="success" /> : <BrandBar />}
          {areasFetching ? <CircularProgress color="success" /> : <AreaBar />}
          <Button variant="outlined" sx={button} onClick={handleClick}>
            Сбросить фильтры
          </Button>
        </Box>
        <Box sx={{width: '100%'}}>{productsFetching ? <CircularProgress color="success" /> : <ProductList />}</Box>
      </Box>
    </Container>
  );
});

export default Shop;
