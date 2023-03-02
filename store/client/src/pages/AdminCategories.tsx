import {useEffect, useState} from 'react';
import {deleteCategory, fetchCategories} from '../http/catalogAPI';
import EditCategory from '../components/EditCategory';
import {ICatalogItem} from '../types/types';
import Propgress from '../components/LinearDeterminate';
import {AdminTable} from '../components/AdminTable/AdminTable';

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

  const Edit = () => (
    <EditCategory id={categoryId} show={show} setShow={setShow} setChange={setChange} key={1}/>
  );

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .finally(() => setFetching(false));
  }, [change]);

  if (fetching) {
    return <Propgress />;
  }

  return (
    <AdminTable
      title={'category'}
      children={[Edit]}
      handleCreateClick={handleCreateClick}
      handleUpdateClick={handleUpdateClick}
      handleDeleteClick={handleDeleteClick}
      items={categories!}
    />
  );
};

export default AdminCategories;
