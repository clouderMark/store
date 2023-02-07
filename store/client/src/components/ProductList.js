import {observer} from 'mobx-react-lite';
import {createSearchParams, useNavigate} from 'react-router-dom';
import {Pagination, Row} from 'react-bootstrap';
import ProductItem from './ProductItem.js';
import {useAppContext} from './AppContext';

const ProductList = observer(() => {
  const {catalog} = useAppContext();
  const navigate = useNavigate();

  const handleClick = (page) => {
    catalog.page = page;

    const params = {};

    if (catalog.category) params.category = catalog.category;
    if (catalog.brand) params.brand = catalog.brand;
    if (catalog.page > 1) params.page = catalog.page;
    navigate({
      pathname: '/',
      search: `?${createSearchParams(params)}`,
    });
  };

  const pages = [];

  for (let page = 1; page <= catalog.pages; page++) {
    pages.push(
      <Pagination.Item key={page} active={page === catalog.page} activeLabel="" onClick={() => handleClick(page)}>
        {page}
      </Pagination.Item>,
    );
  }

  return (
    <>
      <Row className="mb-3">
        {catalog.products.length ? (
          catalog.products.map((item) => <ProductItem key={item.id} data={item} />)
        ) : (
          <p className="m-3">По вашему запросу ничего не найдено</p>
        )}
      </Row>
      {catalog.page > 1 && <Pagination>{pages}</Pagination>}
    </>
  );
});

export default ProductList;
