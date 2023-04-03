import {useEffect, useState} from 'react';
import {Pagination, Stack} from '@mui/material';
import CreateProduct from '../components/CreateUpdateProduct/CreateProduct';
import UpdateProduct from '../components/CreateUpdateProduct/UpdateProduct';
import {deleteProduct, fetchAllProducts} from '../http/catalogAPI';
import {IAllProducts, IProductWithProps, IProduct} from '../types/types.js';
import Progress from '../components/LinearDeterminate';
import {AdminTable} from '../components/AdminTable/AdminTable';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import {productsCells} from '../components/TableCells/cells';

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

  const handleCreateClick = () => {
    setCreateShow(true);
  };

  const CreateProd = () => <CreateProduct show={createShow} setShow={setCreateShow} setChange={setChange} key={1} />;

  const UpdateProd = () => (
    <UpdateProduct id={product!} show={updateShow} setShow={setUpdateShow} setChange={setChange} key={2} />
  );

  const Paginator = () => (
    <Stack spacing={2} sx={{display: 'flex', alignItems: 'center', mt: 3}}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, value) => handlePageClick(value)}
        color="secondary"
      />
    </Stack>
  );

  useEffect(() => {
    fetchAllProducts(null, null, null, currentPage, ADMIN_PER_PAGE)
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
    <>
      <Breadcrumbs />
      <AdminTable
        title="goods"
        headCells={productsCells}
        children={[CreateProd, UpdateProd]}
        handleCreateClick={handleCreateClick}
        items={products!}
        handleUpdateClick={handleUpdateClick}
        handleDeleteClick={handleDeleteClick}
        pagination={{totalPages, pagination: Paginator}}
      />
    </>
  );
};

export default AdminProducts;
