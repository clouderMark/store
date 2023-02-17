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
import {deleteBrand, fetchBrands} from '../http/catalogAPI';
import EditBrand from '../components/EditBrand';
import {ICatalogItem} from '../types/types';
import Propgress from '../components/LinearDeterminate';

const AdminBrands = () => {
  const [brands, setBrands] = useState<ICatalogItem[] | null>(null); // список загруженных брендов
  const [fetching, setFetching] = useState(true); // загрузка списка брендов с сервера
  const [show, setShow] = useState(false); // модальное окно создания бренда
  // для обновления списка после добавления-редактирования, удаления, нужно изменить состояние
  const [change, setChange] = useState(false);
  // id бренда который буду редактировать для передачи в EditBrand
  const [brandId, setBrandId] = useState(0);

  const handleCreateClick = () => {
    setBrandId(0);
    setShow(true);
  };

  const handleUpdateClick = (id: number) => {
    setBrandId(id);
    setShow(true);
  };

  const handleDeleteClick = (id: number) => {
    deleteBrand(id)
      .then((data) => {
        setChange(!change);
        alert(`Бренд "${data.name}" удален`);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchBrands()
      .then((data) => setBrands(data))
      .finally(() => setFetching(false));
  }, [change]);

  if (fetching) {
    return <Propgress />;
  }

  return (
    <Container sx={{mt: 2}}>
      <Typography variant="h4" sx={{mb: 1}}>
        Бренды
      </Typography>
      <Button variant="outlined" onClick={() => handleCreateClick()}>
        Создать бренд
      </Button>
      <EditBrand id={brandId} show={show} setShow={setShow} setChange={setChange} />
      {brands!.length > 0 ? (
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
              {brands!.map((item) => (
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
        <Typography variant="body1">Список брендов пустой</Typography>
      )}
    </Container>
  );
};

export default AdminBrands;
