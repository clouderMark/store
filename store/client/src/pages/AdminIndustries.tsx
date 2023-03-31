import {useEffect, useState} from 'react';
import {deleteIndustry, fetchIndustries} from '../http/catalogAPI';
import EditIndustry from '../components/EditIndustry';
import {ICatalogItem} from '../types/types';
import Propgress from '../components/LinearDeterminate';
import {AdminTable} from '../components/AdminTable/AdminTable';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';

const AdminIndustries = () => {
  const [industries, setIndustries] = useState<null | ICatalogItem[]>(null); // список загруженных индустрий
  const [fetching, setFetching] = useState(true); // загрузка индустрий с сервера
  const [show, setShow] = useState(false); // модальное окно создания-редактирования индустрии
  // для добавления списка после добавления-редактирования, нужно изменить состояние
  const [change, setChange] = useState(false);
  // id индустрий которую буду редактирова и передовать в EditCategory
  const [industryId, setIndustryId] = useState<null | number>(null);

  const handleCreateClick = () => {
    setIndustryId(0);
    setShow(true);
  };

  const handleUpdateClick = (id: number) => {
    setIndustryId(id);
    setShow(true);
  };

  const handleDeleteClick = (id: number) => {
    deleteIndustry(id)
      .then((data) => {
        setChange(!change);
        alert(`Индустрия "${data.name}"удалена`);
      })
      .catch((error) => console.error(error));
  };

  const Edit = () => <EditIndustry id={industryId} show={show} setShow={setShow} setChange={setChange} key={1} />;

  useEffect(() => {
    fetchIndustries()
      .then((data) => setIndustries(data))
      .finally(() => setFetching(false));
  }, [change]);

  if (fetching) {
    return <Propgress />;
  }

  return (
    <>
      <Breadcrumbs />
      <AdminTable
        title={'industry'}
        children={[Edit]}
        handleCreateClick={handleCreateClick}
        handleUpdateClick={handleUpdateClick}
        handleDeleteClick={handleDeleteClick}
        items={industries!}
      />
    </>
  );
};

export default AdminIndustries;
