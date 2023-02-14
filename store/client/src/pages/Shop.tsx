import {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {useLocation, useSearchParams} from 'react-router-dom';
import {Col, Container, Row, Spinner} from 'react-bootstrap';
import CategoryBar from '../components/CategoryBar';
import BrandBar from '../components/BrandBar';
import ProductList from '../components/ProductList';
import {useAppContext} from '../components/AppContext';
import {fetchAllProducts, fetchCategories, fetchBrands} from '../http/catalogAPI';

const getSearchParams = (searchParams: URLSearchParams): {[key: string]: null | number} => {
  let category: string | null | number = searchParams.get('category');

  if (category && /[1-9][0-9]*/.test(category)) {
    category = parseInt(category);
  } else {
    category = null;
  }

  let brand: string | null | number = searchParams.get('brand');

  if (brand && /[1-9][0-9]*/.test(brand)) {
    brand = parseInt(brand);
  } else {
    brand = null;
  }

  let page: string | null | number = searchParams.get('page');

  if (page && /[1-9][0-9]*/.test(page)) {
    page = parseInt(page);
  } else {
    page = null;
  }

  return {category, brand, page};
};

const Shop = observer(() => {
  const {catalog} = useAppContext();

  const [categoriesFetching, setCategoriesFetching] = useState(true);
  const [brandsFetching, setBrandsFetching] = useState(true);
  const [productsFetching, setProductsFetching] = useState(true);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchCategories()
      .then((data) => { catalog.categories = data; })
      .finally(() => setCategoriesFetching(false));
    fetchBrands()
      .then((data) => { catalog.brands = data; })
      .finally(() => setBrandsFetching(false));

    const {category, brand, page} = getSearchParams(searchParams);

    catalog.category = category;
    catalog.brand = brand;
    catalog.page = page ?? 1;

    fetchAllProducts(catalog.category, catalog.brand, catalog.page, catalog.limit)
      .then((data) => {
        catalog.products = data.rows;
        catalog.count = data.count;
      })
      .finally(() => setProductsFetching(false));
  }, []);

  useEffect(() => {
    const {category, brand, page} = getSearchParams(searchParams);

    if (category || brand || page) {
      if (category !== catalog.category) {
        catalog.category = category;
      }

      if (brand !== catalog.brand) {
        catalog.brand = brand;
      }

      if (page !== catalog.page) {
        catalog.page = page ?? 1;
      }
    } else {
      catalog.category = null;
      catalog.brand = null;
      catalog.page = 1;
    }
  }, [location.search]);

  useEffect(() => {
    setProductsFetching(true);
    setTimeout(() => {
      fetchAllProducts(catalog.category, catalog.brand, catalog.page, catalog.limit)
        .then((data) => {
          catalog.products = data.rows;
          catalog.count = data.count;
        })
        .finally(() => setProductsFetching(false));
    }, 1000);
  }, [catalog.category, catalog.brand, catalog.page]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          {categoriesFetching ? (
            <Spinner animation="border" />
          ) : (
            <CategoryBar />
          )}
        </Col>
        <Col>
          <div>
            {brandsFetching ? (
              <Spinner animation="border" />
            ) : (
              <BrandBar />
            )}
          </div>
          <div>
            {productsFetching ? (
              <Spinner animation="border" />
            ) : (
              <ProductList />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
