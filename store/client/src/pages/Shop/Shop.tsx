import {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {useLocation, useSearchParams, createSearchParams, useNavigate} from 'react-router-dom';
import {Container, Box, CircularProgress, Button} from '@mui/material';
import IndustryBar from '../../components/Bar/IndustryBar';
import SolutionBar from '../../components/Bar/SolutionBar';
import AreaBar from '../../components/Bar/AreaBar';
import ProductList from '../../components/ProductList';
import {useAppContext} from '../../components/AppContext';
import {fetchAllProducts, fetchIndustries, fetchSolutions, fetchAreas} from '../../http/catalogAPI';
import {button, mockHeight} from './styles/button';
import {SearchBar} from './SearchBar';

const getSearchParams = (
  searchParams: URLSearchParams,
): {
  solution: number[];
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

  let solution: string | null | number | number[] = searchParams.get('solution');

  if (solution && /[1-9][0-9]*/.test(solution)) {
    solution = solution.split(',').map((el) => +el);
  } else {
    solution = [];
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

  return {industry, solution, area, page};
};

const Shop = observer(() => {
  const {catalog} = useAppContext();

  const [industriesFetching, setIndustriesFetching] = useState(true);
  const [solutionsFetching, setSolutionsFetching] = useState(true);
  const [areasFetching, setAreasFetching] = useState(true);
  const [productsFetching, setProductsFetching] = useState(true);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleClick = () => {
    catalog.solution = [];
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
    fetchSolutions()
      .then((data) => {
        catalog.solutions = data;
      })
      .finally(() => setSolutionsFetching(false));
    fetchAreas()
      .then((data) => {
        catalog.areas = data;
      })
      .finally(() => setAreasFetching(false));

    const {industry, solution, area, page} = getSearchParams(searchParams);

    catalog.industry = industry;
    catalog.solution = solution;
    catalog.area = area;
    catalog.page = page ?? 1;

    fetchAllProducts(
      catalog.industry.length ? catalog.industry : null,
      catalog.solution.length ? catalog.solution : null,
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
    const {industry, solution, area, page} = getSearchParams(searchParams);

    if (industry.length || solution.length || area.length || page) {
      if (industry.length !== catalog.industry.length) {
        catalog.industry = industry;
      }

      if (solution.length !== catalog.solution.length) {
        catalog.solution = solution;
      }

      if (area.length !== catalog.area.length) {
        catalog.area = area;
      }

      if (page !== catalog.page) {
        catalog.page = page ?? 1;
      }
    } else {
      catalog.industry = [];
      catalog.solution = [];
      catalog.area = [];
      catalog.page = 1;
    }
  }, [location.search]);

  useEffect(() => {
    setProductsFetching(true);
    fetchAllProducts(
      catalog.industry.length ? catalog.industry : null,
      catalog.solution.length ? catalog.solution : null,
      catalog.area.length ? catalog.area : null,
      catalog.page,
      catalog.limit,
    )
      .then((data) => {
        catalog.products = data.rows;
        catalog.count = data.count;
      })
      .finally(() => setProductsFetching(false));
  }, [catalog.industry, catalog.solution, catalog.area, catalog.page]);

  return (
    <Container maxWidth={false}>
      <SearchBar />
      <Box sx={{display: 'flex'}}>
        <Box sx={{width: '25.57%', marginRight: '100px'}}>
          <Box sx={{display: 'flex', flexDirection: 'column', width: '83%'}}>
            {industriesFetching ? <CircularProgress color="success" /> : <IndustryBar />}
            {areasFetching ? <CircularProgress color="success" /> : <AreaBar />}
            {solutionsFetching ? <CircularProgress color="success" /> : <SolutionBar />}
            {catalog.solution.length || catalog.area.length || catalog.industry.length ? (
              <Button variant="outlined" sx={button} onClick={handleClick}>
                Сбросить фильтры
              </Button>
            ) : <Box sx={mockHeight}/>}
          </Box>
        </Box>
        <Box sx={{width: '100%'}}>{productsFetching ? <CircularProgress color="success" /> : <ProductList />}</Box>
      </Box>
    </Container>
  );
});

export default Shop;
