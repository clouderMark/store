import {useEffect, useState} from 'react';
import {deleteSolution, fetchSolutions} from '../http/catalogAPI';
import EditSolution from '../components/EditSolution';
import {ICatalogItem} from '../types/types';
import Propgress from '../components/LinearDeterminate';
import {AdminTable} from '../components/AdminTable/AdminTable';

const AdminSolutions = () => {
  const [solutions, setSolutions] = useState<ICatalogItem[] | null>(null); // список загруженных решений
  const [fetching, setFetching] = useState(true); // загрузка списка решений с сервера
  const [show, setShow] = useState(false); // модальное окно создания решения
  // для обновления списка после добавления-редактирования, удаления, нужно изменить состояние
  const [change, setChange] = useState(false);
  // id решения который буду редактировать для передачи в EditSolution
  const [solutionId, setSolutionId] = useState(0);

  const handleCreateClick = () => {
    setSolutionId(0);
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
        alert(`Решение "${data.name}" удалено`);
      })
      .catch((error) => console.error(error));
  };

  const Edit = () => (
    <EditSolution id={solutionId} show={show} setShow={setShow} setChange={setChange} key={1}/>
  );

  useEffect(() => {
    fetchSolutions()
      .then((data) => setSolutions(data))
      .finally(() => setFetching(false));
  }, [change]);

  if (fetching) {
    return <Propgress />;
  }

  return (
    <AdminTable
      title={'solution'}
      children={[Edit]}
      handleCreateClick={handleCreateClick}
      handleUpdateClick={handleUpdateClick}
      handleDeleteClick={handleDeleteClick}
      items={solutions!}
    />
  );
};

export default AdminSolutions;
