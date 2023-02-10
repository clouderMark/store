import {useEffect, useState} from 'react';
import {Button, Container, Pagination, Spinner, Table} from 'react-bootstrap';
import CreateProduct from '../components/CreateProduct';
import UpdateProduct from '../components/UpdateProduct';
import {deleteProduct, fetchAllProducts} from '../http/catalogAPI';
import {IAllProducts, IRow, IProduct} from '../types/types.js';

// количество товаров на страницу
const ADMIN_PER_PAGE = 6;

const AdminProducts = () => {
  const [products, setProducts] = useState<IRow[]>([]); // список загруженных товаров
  const [fetching, setFetching] = useState(true); // загрузка списка товаров с сервера
  const [createShow, setCreateShow] = useState(false); // модальное окно создания товаров
  const [updateShow, setUpdateShow] = useState(false); // модальное окно редактирования
  // для обновления списка после добавления, редактирования, удаления - изменяем состояние
  const [change, setChange] = useState(false);
  // id товара котоый буду редактировать
  const [product, setProduct] = useState<null | number>(null);

  // текущая страница товаров
  const [currentPage, setCurrentPage] = useState(1);
  // сколько всего страниц списка товаров
  const [totalPages, setTotalPages] = useState(1);

  // обработчик клика по номеру страницы
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    setFetching(true);
  };

  // содержание компонента <Pagination>
  const pages = [];

  for (let page = 1; page <= totalPages; page++) {
    pages.push(
      <Pagination.Item key={page} active={page === currentPage} activeLabel="" onClick={() => handlePageClick(page)}>
        {page}
      </Pagination.Item>,
    );
  }

  const handleUpdateClick = (id: number) => {
    setProduct(id);
    setUpdateShow(true);
  };

  const handleDeleteClick = (id: number) => {
    deleteProduct(id)
      .then((data: IProduct) => {
        // если это последняя страница и я удаляю на ней единственно
        // оставшийся товар, то нужно перейте к предыдущей странице
        if (totalPages > 1 && products.length === 1 && currentPage === totalPages) {
          setCurrentPage(currentPage - 1);
        } else {
          setChange(!change);
        }
        // eslint-disable-next-line
        alert(`Товар "${data.name}" удален`);
      })
      // eslint-disable-next-line
      .catch((error) => alert(error.response.data.message));
  };

  useEffect(() => {
    fetchAllProducts(null, null, currentPage, ADMIN_PER_PAGE)
      .then((data: IAllProducts) => {
        setProducts(data.rows);
        setTotalPages(Math.ceil(data.count / ADMIN_PER_PAGE));
      })
      .finally(() => setFetching(false));
  }, [change, currentPage]);

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Товары</h1>
      <Button onClick={() => setCreateShow(true)}>Создать товар</Button>
      <CreateProduct show={createShow} setShow={setCreateShow} setChange={setChange} />
      <UpdateProduct id={product!} show={updateShow} setShow={setUpdateShow} setChange={setChange} />
      {products.length > 0 ? (
        <>
          <Table bordered hover size="sm" className="mt-3">
            <thead>
              <tr>
                <th>Название</th>
                <th>Категория</th>
                <th>Бренд</th>
                <th>Цена</th>
                <th>Редактировать</th>
                <th>Удалить</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category.name}</td>
                  <td>{item.brand.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <Button variant="success" size="sm" onClick={() => handleUpdateClick(item.id)}>
                      Редактировать
                    </Button>
                  </td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(item.id)}>
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {totalPages > 1 && <Pagination>{pages}</Pagination>}
        </>
      ) : (
        <p>Список товаров пустой</p>
      )}
    </Container>
  );
};

export default AdminProducts;
