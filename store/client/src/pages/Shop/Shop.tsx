import {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {useLocation, useSearchParams, createSearchParams, useNavigate} from 'react-router-dom';
import {Container, Box, CircularProgress, Button} from '@mui/material';
import IndustryBar from '../../components/IndustryBar';
import BrandBar from '../../components/BrandBar';
import AreaBar from '../../components/AreaBar';
import ProductList from '../../components/ProductList';
import {useAppContext} from '../../components/AppContext';
import {fetchAllProducts, fetchIndustries, fetchBrands, fetchAreas} from '../../http/catalogAPI';
import {button} from './styles';
import {SearchBar} from './SearchBar';

const getSearchParams = (
  searchParams: URLSearchParams,
): {
  brand: number[];
  page: null | number;
  area: number[];
  industry: number[];
} => {
  let industry: string | null | number | number[] = searchParams.get('industry');

  if (industry && /[1-9][0-9]*/.test(industry)) {
    industry = industry.split(',').map((el) => +el);
  } else {
    industry = [];
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

  return {industry, brand, area, page};
};

const Shop = observer(() => {
  const {catalog} = useAppContext();

  const [industriesFetching, setIndustriesFetching] = useState(true);
  const [brandsFetching, setBrandsFetching] = useState(true);
  const [areasFetching, setAreasFetching] = useState(true);
  const [productsFetching, setProductsFetching] = useState(true);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleClick = () => {
    catalog.brand = [];
    catalog.industry = [];
    catalog.area = [];

    navigate({
      pathname: '/shop',
      search: `?${createSearchParams('')}`,
    });
  };

  useEffect(() => {
    fetchIndustries()
      .then((data) => {
        catalog.industries = data;
      })
      .finally(() => setIndustriesFetching(false));
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

    const {industry, brand, area, page} = getSearchParams(searchParams);

    catalog.industry = industry;
    catalog.brand = brand;
    catalog.area = area;
    catalog.page = page ?? 1;

    fetchAllProducts(
      catalog.industry.length ? catalog.industry : null,
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
    const {industry, brand, area, page} = getSearchParams(searchParams);

    if (industry.length || brand.length || area.length || page) {
      if (industry.length !== catalog.industry.length) {
        catalog.industry = industry;
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
      catalog.industry = [];
      catalog.brand = [];
      catalog.area = [];
      catalog.page = 1;
    }
  }, [location.search]);

  useEffect(() => {
    setProductsFetching(true);
    fetchAllProducts(
      catalog.industry.length ? catalog.industry : null,
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
  }, [catalog.industry, catalog.brand, catalog.area, catalog.page]);

  return (
    <Container maxWidth={false}>
      <SearchBar />
      <Box sx={{display: 'flex'}}>
        <Box sx={{display: 'flex', flexDirection: 'column', minWidth: '358px'}}>
          {industriesFetching ? <CircularProgress color="success" /> : <IndustryBar />}
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
