import {useEffect, useState} from 'react';
import {Button, Container, Spinner, Table} from 'react-bootstrap';
import {deleteBrand, fetchBrands} from '../http/catalogAPI';
import EditBrand from '../components/EditBrand';
import {ICatalogItem} from '../types/types';

const AdminBrands = () => {
  const [brands, setBrands] = useState<ICatalogItem[] | null>(null); // список загруженных брендов
  const [fetching, setFetching] = useState(true); // загрузка списка брендов с сервера
  const [show, setShow] = useState(false); // модальное окно создания бренда
  // для обновления списка после добавления-редактирования, удаления, нужно изменить состояние
  const [change, setChange] = useState(false);
  // id бренда который буду редактировать для передачи в EditBrand
  const [brandId, setBrandId] = useState(0);

  const handleCreateClick = () => {
    setBrandId(0);
    setShow(true);
  };

  const handleUpdateClick = (id: number) => {
    setBrandId(id);
    setShow(true);
  };

  const handleDeleteClick = (id: number) => {
    deleteBrand(id)
      .then((data) => {
        setChange(!change);
        alert(`Бренд "${data.name}" удален`);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchBrands()
      .then((data) => setBrands(data))
      .finally(() => setFetching(false));
  }, [change]);

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Бренды</h1>
      <Button onClick={() => handleCreateClick()}>Создать бренд</Button>
      <EditBrand id={brandId} show={show} setShow={setShow} setChange={setChange} />
      {brands!.length > 0 ? (
        <Table bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Название</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {brands!.map((item) => (
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
        <p>Список брендов пустой</p>
      )}
    </Container>
  );
};

export default AdminBrands;
