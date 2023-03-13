import {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {useLocation, useSearchParams, createSearchParams, useNavigate} from 'react-router-dom';
import {Container, Box, CircularProgress, Button} from '@mui/material';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import ProductList from '../../components/ProductList';
import {useAppContext} from '../../components/AppContext';
import {fetchAllProducts, fetchIndustries, fetchSolutions, fetchAreas} from '../../http/catalogAPI';
import {button} from './styles/button';
import {SearchBar} from '../../components/Bar/SearchBar/SearchBar';
import {FiltersBar} from '../../components/Bar/FiltersBar/FiltersBar';
import IndividualProduct from '../../components/IndividualProduct/IndividualProduct';
import Shipping from '../../components/Shipping/Shipping';
import Contact from '../../components/Contact/Contact';

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

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const barQueryDesctop = useMediaQuery('(min-width:1023px)', {noSsr: true});
  const filterLength = catalog.solution.length + catalog.area.length + catalog.industry.length;

  const resetFilters = () => {
    catalog.solution = [];
    catalog.industry = [];
    catalog.area = [];

    navigate({
      pathname: '/shop',
      search: `?${createSearchParams('')}`,
    });
  };

  const openDrawer = () => {
    setOpen(!open);
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
    <>
      <Container maxWidth={false} sx={{paddingBottom: '100px'}}>
        {!barQueryDesctop ? (
          <Button onClick={openDrawer} sx={button.filters} startIcon={<TuneRoundedIcon />}>
            Фильтры {filterLength > 0 ? `(${filterLength})` : null}
          </Button>
        ) : null}
        <SearchBar matches={barQueryDesctop} />
        <Box sx={{display: 'flex'}}>
          <FiltersBar
            industriesFetching={industriesFetching}
            areasFetching={areasFetching}
            solutionsFetching={solutionsFetching}
            resetFilters={resetFilters}
            isResetButton={filterLength > 0}
            query={barQueryDesctop}
            open={open}
            setOpen={setOpen}
          />
          <Box sx={{width: '100%'}}>
            {productsFetching ? <CircularProgress color="success" /> : <ProductList />}
            <IndividualProduct />
          </Box>
        </Box>
      </Container>
      <Shipping />
      <Contact />
    </>
  );
});

export default Shop;
