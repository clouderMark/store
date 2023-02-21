import {useEffect, useState} from 'react';
import {
  Container,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Pagination,
  Stack,
} from '@mui/material';
import CreateProduct from '../components/CreateProduct';
import UpdateProduct from '../components/UpdateProduct';
import {deleteProduct, fetchAllProducts} from '../http/catalogAPI';
import {IAllProducts, IProductWithProps, IProduct} from '../types/types.js';
import Progress from '../components/LinearDeterminate';

// количество товаров на страницу
const ADMIN_PER_PAGE = 6;

const AdminProducts = () => {
  const [products, setProducts] = useState<IProductWithProps[]>([]); // список загруженных товаров
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
    if (page !== currentPage) {
      setCurrentPage(page);
      setFetching(true);
    }
  };

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

        alert(`Товар "${data.name}" удален`);
      })
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
    return <Progress />;
  }

  return (
    <Container sx={{mt: 2}}>
      <Typography variant="h4" sx={{mb: 1}}>
        Товары
      </Typography>
      <Button variant="outlined" onClick={() => setCreateShow(true)}>
        Создать товар
      </Button>
      <CreateProduct show={createShow} setShow={setCreateShow} setChange={setChange} />
      <UpdateProduct id={product!} show={updateShow} setShow={setUpdateShow} setChange={setChange} />
      {products.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{mt: 2}}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell>Категория</TableCell>
                  <TableCell>Бренд</TableCell>
                  <TableCell>Цена</TableCell>
                  <TableCell>Редактировать</TableCell>
                  <TableCell>Удалить</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category.name}</TableCell>
                    <TableCell>{item.brand.name}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <Button variant="outlined" color="success" onClick={() => handleUpdateClick(item.id)}>
                        Редактировать
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="outlined" color="error" onClick={() => handleDeleteClick(item.id)}>
                        Удалить
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {totalPages > 1 ? (
            <Stack spacing={2} sx={{display: 'flex', alignItems: 'center', mt: 3}}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, value) => handlePageClick(value)}
                color="secondary"
              />
            </Stack>
          ) : null}
        </>
      ) : (
        <p>Список товаров пустой</p>
      )}
    </Container>
  );
};

export default AdminProducts;
