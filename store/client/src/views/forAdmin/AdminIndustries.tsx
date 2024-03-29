import {useState} from 'react';
import {deleteIndustry, createIndustry, fetchIndustry, updateIndustry} from '../../http/catalogAPI';
import EditIndustry from '../../components/EditIndustry/EditIndustry';
import Propgress from '../../components/LinearDeterminate';
import {AdminTable} from '../../components/AdminTable/AdminTable';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import {areaCells} from '../../components/TableCells/cells';
import {useAppContext} from '../../components/AppContext';
import AlertLine from '../../components/AlertLine/AlertLine';

const AdminIndustries = () => {
  const {catalog} = useAppContext();
  const [show, setShow] = useState(false); // модальное окно создания-редактирования индустрии
  // для добавления списка после добавления-редактирования, нужно изменить состояние
  const [change, setChange] = useState(false);
  // id индустрий которую буду редактирова и передовать в EditCategory
  const [industryId, setIndustryId] = useState<null | number>(null);
  const [alertOnDelete, setAlertOnDelete] = useState<false | string>(false);

  const handleCreateClick = () => {
    // setIndustryId(null);
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
        setAlertOnDelete(`Индустрия "${data.name}"удалена`);
        setTimeout(() => {
          setAlertOnDelete(false);
        }, 5000);
        catalog.industries = catalog.industries.filter((el) => el.id !== data.id);
      })
      .catch((error) => console.error(error));
  };

  if (catalog.industriesFetching) {
    return <Propgress />;
  }

  return (
    <>
      <Breadcrumbs />
      <AdminTable
        title={'industry'}
        headCells={areaCells}
        children={[
          <EditIndustry
            popUpTitle="индустрии"
            id={industryId}
            setId={setIndustryId}
            show={show}
            setShow={setShow}
            setChange={setChange}
            fetch={fetchIndustry}
            create={createIndustry}
            updata={updateIndustry}
            key="1"
          />,
        ]}
        handleCreateClick={handleCreateClick}
        handleUpdateClick={handleUpdateClick}
        handleDeleteClick={handleDeleteClick}
        items={catalog.industries}
      />
      {alertOnDelete ? <AlertLine content={alertOnDelete} success={Boolean(alertOnDelete)} /> : null}
    </>
  );
};

export default AdminIndustries;
