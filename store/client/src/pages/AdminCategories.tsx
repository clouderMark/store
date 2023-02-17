import {useEffect, useState} from 'react';
import {
  Container,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@mui/material';
import {deleteCategory, fetchCategories} from '../http/catalogAPI';
import EditCategory from '../components/EditCategory';
import {ICatalogItem} from '../types/types';
import Propgress from '../components/LinearDeterminate';

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

  return (
    <Container sx={{mt: 2}}>
      <Typography variant="h4" sx={{mb: 1}}>
        Категории
      </Typography>
      <Button variant="outlined" onClick={() => handleCreateClick()}>
        Создать категорию
      </Button>
      <EditCategory id={categoryId} show={show} setShow={setShow} setChange={setChange}/>
      {categories && categories.length > 0 ? (
        <TableContainer component={Paper} sx={{mt: 2}}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell>Редактировать</TableCell>
                <TableCell>Удалить</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="success" onClick={() => handleUpdateClick(item.id)}>
                      Редактировать
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" color="error" onClick={() => handleDeleteClick(item.id)}>
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1">Список категорий пустой</Typography>
      )}
    </Container>
  );
};

export default AdminCategories;
