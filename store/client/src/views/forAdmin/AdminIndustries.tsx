import {useState} from 'react';
import {deleteIndustry} from '../../http/catalogAPI';
import EditIndustry from '../../components/EditIndustry';
import Propgress from '../../components/LinearDeterminate';
import {AdminTable} from '../../components/AdminTable/AdminTable';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import {areaCells} from '../../components/TableCells/cells';
import {useAppContext} from '../../components/AppContext';

const AdminIndustries = () => {
  const {catalog} = useAppContext();
  const [show, setShow] = useState(false); // модальное окно создания-редактирования индустрии
  // для добавления списка после добавления-редактирования, нужно изменить состояние
  const [change, setChange] = useState(false);
  // id индустрий которую буду редактирова и передовать в EditCategory
  const [industryId, setIndustryId] = useState<null | number>(null);

  const handleCreateClick = () => {
    setIndustryId(null);
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
        catalog.industries = catalog.industries.filter((el) => el.id !== data.id);
      })
      .catch((error) => console.error(error));
  };

  const Edit = () => (
    <EditIndustry id={industryId} setId={setIndustryId} show={show} setShow={setShow} setChange={setChange} key={1} />
  );

  if (catalog.industriesFetching) {
    return <Propgress />;
  }

  return (
    <>
      <Breadcrumbs />
      <AdminTable
        title={'industry'}
        headCells={areaCells}
        children={[Edit]}
        handleCreateClick={handleCreateClick}
        handleUpdateClick={handleUpdateClick}
        handleDeleteClick={handleDeleteClick}
        items={catalog.industries}
      />
    </>
  );
};

export default AdminIndustries;
