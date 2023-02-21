import {useEffect, useState} from 'react';
import {deleteCategory, fetchCategories} from '../http/catalogAPI';
import EditCategory from '../components/EditCategory';
import {ICatalogItem} from '../types/types';
import Propgress from '../components/LinearDeterminate';
import {TableCategory} from '../components/TableCategory';

const AdminCategories = () => {
  const [categories, setCategories] = useState<null | ICatalogItem[]>(null); // список загруженных категорий
  const [fetching, setFetching] = useState(true); // загрузка категорий с сервера
  const [show, setShow] = useState(false); // модальное окно создания-редактирования категории
  // для добавления списка после добавления-редактирования, нужно изменить состояние
  const [change, setChange] = useState(false);
  // id категории которую буду редактирова и передовать в EditCategory
  const [categoryId, setCategoryId] = useState<null | number>(null);

  const handleCreateClick = () => {
    setCategoryId(0);
    setShow(true);
  };

  const handleUpdateClick = (id: number) => {
    setCategoryId(id);
    setShow(true);
  };

  const handleDeleteClick = (id: number) => {
    deleteCategory(id)
      .then((data) => {
        setChange(!change);
        alert(`Категория "${data.name}"удалена`);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .finally(() => setFetching(false));
  }, [change]);

  if (fetching) {
    return <Propgress />;
  }

  const component = () => <EditCategory id={categoryId} show={show} setShow={setShow} setChange={setChange} />;

  return (
    <TableCategory
      title={'категории'}
      child={component}
      handleCreateClick={handleCreateClick}
      items={categories!}
      handleUpdateClick={handleUpdateClick}
      handleDeleteClick={handleDeleteClick}
    />
  );
};

export default AdminCategories;
