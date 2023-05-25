import {useState} from 'react';
import {deleteSolution} from '../../http/catalogAPI';
import EditSolution from '../../components/EditSolution/EditSolution';
import Progress from '../../components/LinearDeterminate';
import {AdminTable} from '../../components/AdminTable/AdminTable';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import {areaCells} from '../../components/TableCells/cells';
import {useAppContext} from '../../components/AppContext';
import AlertLine from '../../components/AlertLine/AlertLine';

const AdminSolutions = () => {
  const {catalog} = useAppContext();
  // const [fetching, setFetching] = useState(true); // загрузка списка решений с сервера
  const [show, setShow] = useState(false); // модальное окно создания решения
  // для обновления списка после добавления-редактирования, удаления, нужно изменить состояние
  const [change, setChange] = useState(false);
  // id решения который буду редактировать для передачи в EditSolution
  const [solutionId, setSolutionId] = useState<null | number>(null);
  const [alertOnDelete, setAlertOnDelete] = useState<false | string>(false);

  const handleCreateClick = () => {
    setShow(true);
  };

  const handleUpdateClick = (id: number) => {
    setSolutionId(id);
    setShow(true);
  };

  const handleDeleteClick = (id: number) => {
    deleteSolution(id)
      .then((data) => {
        setChange(!change);
        catalog.solutions = catalog.solutions.filter((el) => el.id !== data.id);
        setAlertOnDelete(`Решение "${data.name}" удалено`);
        setTimeout(() => {
          setAlertOnDelete(false);
        }, 5000);
      })
      .catch((error) => console.error(error));
  };

  if (catalog.solutionsFetching) {
    return <Progress />;
  }

  return (
    <>
      <Breadcrumbs />
      <AdminTable
        title={'solution'}
        headCells={areaCells}
        children={[
          <EditSolution
            id={solutionId}
            setId={setSolutionId}
            show={show}
            setShow={setShow}
            setChange={setChange}
            key="1"
          />,
        ]}
        handleCreateClick={handleCreateClick}
        handleUpdateClick={handleUpdateClick}
        handleDeleteClick={handleDeleteClick}
        items={catalog.solutions!}
      />
      {alertOnDelete ? <AlertLine content={alertOnDelete} success={Boolean(alertOnDelete)}/> : null}
    </>
  );
};

export default AdminSolutions;
