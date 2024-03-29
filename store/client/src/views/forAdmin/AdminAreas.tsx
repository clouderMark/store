import {useEffect, useState} from 'react';
import {deleteArea, fetchAreas} from '../../http/catalogAPI';
import EditArea from '../../components/EditArea';
import {ICatalogItem} from '../../types/types';
import Propgress from '../../components/LinearDeterminate';
import {AdminTable} from '../../components/AdminTable/AdminTable';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import {areaCells} from '../../components/TableCells/cells';
import AlertLine from '../../components/AlertLine/AlertLine';

const AdminAreas = () => {
  const [areas, setAreas] = useState<ICatalogItem[] | null>(null);
  const [fetching, setFetching] = useState(true);
  const [show, setShow] = useState(false);
  const [change, setChange] = useState(false);
  const [areaId, setAreaId] = useState(0);
  const [alertOnDelete, setAlertOnDelete] = useState<false | string>(false);

  const handleCreateClick = () => {
    setAreaId(0);
    setShow(true);
  };

  const handleUpdateClick = (id: number) => {
    setAreaId(id);
    setShow(true);
  };

  const handleDeleteClick = (id: number) => {
    deleteArea(id)
      .then((data) => {
        setChange(!change);
        setAlertOnDelete(`Области применения "${data.name}" удалено`);
        setTimeout(() => {
          setAlertOnDelete(false);
        }, 5000);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchAreas()
      .then((data) => setAreas(data))
      .finally(() => setFetching(false));
  }, [change]);

  if (fetching) {
    return <Propgress />;
  }

  return (
    <>
      <Breadcrumbs />
      <AdminTable
        title={'area'}
        headCells={areaCells}
        children={[<EditArea id={areaId} show={show} setShow={setShow} setChange={setChange} key="1" />]}
        handleCreateClick={handleCreateClick}
        handleUpdateClick={handleUpdateClick}
        handleDeleteClick={handleDeleteClick}
        items={areas!}
      />
      {alertOnDelete ? <AlertLine content={alertOnDelete} success={Boolean(alertOnDelete)} /> : null}
    </>
  );
};

export default AdminAreas;
