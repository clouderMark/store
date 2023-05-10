import {useEffect, useState} from 'react';
import {deleteSolution, fetchSolutions} from '../../http/catalogAPI';
import EditSolution from '../../components/EditSolution/EditSolution';
import Propgress from '../../components/LinearDeterminate';
import {AdminTable} from '../../components/AdminTable/AdminTable';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import {areaCells} from '../../components/TableCells/cells';
import {useAppContext} from '../../components/AppContext';

const AdminSolutions = () => {
  const {catalog} = useAppContext();
  const [fetching, setFetching] = useState(true); // загрузка списка решений с сервера
  const [show, setShow] = useState(false); // модальное окно создания решения
  // для обновления списка после добавления-редактирования, удаления, нужно изменить состояние
  const [change, setChange] = useState(false);
  // id решения который буду редактировать для передачи в EditSolution
  const [solutionId, setSolutionId] = useState<null | number>(null);

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
        alert(`Решение "${data.name}" удалено`);
      })
      .catch((error) => console.error(error));
  };

  const Edit = () => (
    <EditSolution id={solutionId} setId={setSolutionId} show={show} setShow={setShow} setChange={setChange} key={1} />
  );

  useEffect(() => {
    if (!catalog.solutions.length) {
      fetchSolutions()
        .then((data) => {
          catalog.solutions = data;
        })
        .finally(() => setFetching(false));
    } else {
      setFetching(false);
    }
  }, []);

  if (fetching) {
    return <Propgress />;
  }

  return (
    <>
      <Breadcrumbs />
      <AdminTable
        title={'solution'}
        headCells={areaCells}
        children={[Edit]}
        handleCreateClick={handleCreateClick}
        handleUpdateClick={handleUpdateClick}
        handleDeleteClick={handleDeleteClick}
        items={catalog.solutions!}
      />
    </>
  );
};

export default AdminSolutions;
