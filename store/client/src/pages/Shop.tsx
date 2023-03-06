import {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {useLocation, useSearchParams} from 'react-router-dom';
import {Container, Box, CircularProgress} from '@mui/material';
import CategoryBar from '../components/CategoryBar';
import BrandBar from '../components/BrandBar';
import AreaBar from '../components/AreaBar';
import ProductList from '../components/ProductList';
import {useAppContext} from '../components/AppContext';
import {fetchAllProducts, fetchCategories, fetchBrands, fetchAreas} from '../http/catalogAPI';

const getSearchParams = (
  searchParams: URLSearchParams,
): {
  brand: number[];
  page: null | number;
  area: null | number;
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

  let area: string | null | number = searchParams.get('area');

  if (area && /[1-9][0-9]*/.test(area)) {
    area = parseInt(area);
  } else {
    area = null;
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
      catalog.category.length > 0 ? catalog.category : null,
      catalog.brand.length ? catalog.brand : null,
      catalog.area,
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

    if (category.length > 0 || brand.length || area || page) {
      if (category.length !== catalog.category.length) {
        catalog.category = category;
      }

      if (brand.length !== catalog.brand.length) {
        catalog.brand = brand;
      }

      if (area !== catalog.area) {
        catalog.area = area;
      }

      if (page !== catalog.page) {
        catalog.page = page ?? 1;
      }
    } else {
      catalog.category = [];
      catalog.brand = [];
      catalog.area = null;
      catalog.page = 1;
    }
  }, [location.search]);

  useEffect(() => {
    setProductsFetching(true);
    fetchAllProducts(
      catalog.category.length > 0 ? catalog.category : null,
      catalog.brand.length ? catalog.brand : null,
      catalog.area,
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
    <Container maxWidth={false} sx={{width: 1400}}>
      <Box sx={{display: 'flex'}}>
        <Box sx={{width: 258}}>
          {categoriesFetching ? <CircularProgress color="success" /> : <CategoryBar />}
          {brandsFetching ? <CircularProgress color="success" /> : <BrandBar />}
          {areasFetching ? <CircularProgress color="success" /> : <AreaBar />}
        </Box>
        <Box>
          <div>{productsFetching ? <CircularProgress color="success" /> : <ProductList />}</div>
        </Box>
      </Box>
    </Container>
  );
});

export default Shop;
