import {useEffect, useState} from 'react';
import {Button, Container, Spinner, Table} from 'react-bootstrap';
import {deleteCategory, fetchCategories} from '../http/catalogAPI';
import EditCategory from '../components/EditCategory.js';

const AdminCategories = () => {
  const [categories, setCategories] = useState(null); // список загруженных категорий
  const [fetching, setFetching] = useState(true); // загрузка категорий с сервера
  const [show, setShow] = useState(false); // модальное окно создания-редактирования категории
  // для добавления списка после добавления-редактирования, нужно изменить состояние
  const [change, setChange] = useState(false);
  // id категории которую буду редактирова и передовать в EditCategory
  const [categoryId, setCategoryId] = useState(null);

  const handleCreateClick = () => {
    setCategoryId(0);
    setShow(true);
  };

  const handleUpdateClick = (id) => {
    setCategoryId(id);
    setShow(true);
  };

  const handleDeleteClick = (id) => {
    deleteCategory(id)
      .then((data) => {
        setChange(!change);
        // eslint-disable-next-line
        alert(`Категория "${data.name}"удалена`);
      })
      // eslint-disable-next-line
      .catch((error) => alert(error.response.data.message));
  };

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .finally(() => setFetching(false));
  }, [change]);

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Категории</h1>
      <Button onClick={() => handleCreateClick(true)}>Создать категорию</Button>
      <EditCategory id={categoryId} show={show} setShow={setShow} setChange={setChange} />
      {categories.length > 0 ? (
        <Table bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Название</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
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
      ) : (
        <p>Список категорий пустой</p>
      )}
    </Container>
  );
};

export default AdminCategories;
