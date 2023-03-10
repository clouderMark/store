import {useEffect, useState} from 'react';
import {deleteArea, fetchAreas} from '../http/catalogAPI';
import EditArea from '../components/EditArea';
import {ICatalogItem} from '../types/types';
import Propgress from '../components/LinearDeterminate';
import {AdminTable} from '../components/AdminTable/AdminTable';

const AdminAreas = () => {
  const [areas, setAreas] = useState<ICatalogItem[] | null>(null);
  const [fetching, setFetching] = useState(true);
  const [show, setShow] = useState(false);
  const [change, setChange] = useState(false);
  const [areaId, setAreaId] = useState(0);

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
        alert(`Области применения "${data.name}" удалено`);
      })
      .catch((error) => console.error(error));
  };

  const Edit = () => (
    <EditArea id={areaId} show={show} setShow={setShow} setChange={setChange} key={1}/>
  );

  useEffect(() => {
    fetchAreas()
      .then((data) => setAreas(data))
      .finally(() => setFetching(false));
  }, [change]);

  if (fetching) {
    return <Propgress />;
  }

  return (
    <AdminTable
      title={'area'}
      children={[Edit]}
      handleCreateClick={handleCreateClick}
      handleUpdateClick={handleUpdateClick}
      handleDeleteClick={handleDeleteClick}
      items={areas!}
    />
  );
};

export default AdminAreas;
