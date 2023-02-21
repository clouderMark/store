import {useEffect, useState} from 'react';
import {deleteBrand, fetchBrands} from '../http/catalogAPI';
import EditBrand from '../components/EditBrand';
import {ICatalogItem} from '../types/types';
import Propgress from '../components/LinearDeterminate';
import {TableCategory} from '../components/TableCategory';

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
    return <Propgress />;
  }

  const component = () => <EditBrand id={brandId} show={show} setShow={setShow} setChange={setChange} />;

  return (
    <TableCategory
      title={'бренды'}
      child={component}
      handleCreateClick={handleCreateClick}
      items={brands!}
      handleUpdateClick={handleUpdateClick}
      handleDeleteClick={handleDeleteClick}
    />
  );
};

export default AdminBrands;
