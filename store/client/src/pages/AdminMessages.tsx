import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Container, Typography, TableCell, TableRow, Button} from '@mui/material';
import {adminGetAllMessages, adminDelete} from '../http/contactAPI';
import {IMessage} from '../types/types';
import Progress from '../components/LinearDeterminate';
import {Board} from '../components/Board';

const headCells = [
  {
    label: '№',
  },
  {
    label: 'Компания',
  },
  {
    label: 'Имя',
  },
  {
    label: 'Email',
  },
  {
    label: 'Телефон',
  },
  {
    label: 'Вопрос',
  },
  {
    label: 'Тип обращения',
  },
  {
    label: 'Подробнее',
  },
  {
    label: 'Удалить',
  },
];

const AdminMessages = () => {
  const [messages, setMessages] = useState<null | IMessage[]>(null);
  const [fetching, setFetching] = useState(true);

  const handleDeleteClick = (id: number) => {
    adminDelete(id).then((data) => {
      alert(`Сообщение №${data.id} удалено`);
      if (messages) {
        setMessages(messages?.filter((el) => el.id !== data.id));
      }
    });
  };

  useEffect(() => {
    adminGetAllMessages()
      .then((data) => setMessages(data))
      .finally(() => setFetching(false));
  }, []);

  const TableHeadCells = () => (
    <>
      {headCells.map((headCell, i) => (
        <TableCell key={i}>{headCell.label}</TableCell>
      ))}
    </>
  );

  const BodyCells = () => (
    <>
      {messages?.map((item) => (
        <TableRow key={item.id} hover>
          <TableCell scope="row">{item.id}</TableCell>
          <TableCell>{item.company}</TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.email}</TableCell>
          <TableCell>{item.phone}</TableCell>
          <TableCell>{item.question}</TableCell>
          <TableCell>{item.type}</TableCell>
          <TableCell>
            <Button component={Link} to={`/admin/messages/${item.id}`} variant="outlined">
              Подробнее
            </Button>
          </TableCell>
          <TableCell>
            <Button variant="outlined" onClick={() => handleDeleteClick(item.id)} color="warning">
              Удалить
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  if (fetching) {
    return <Progress />;
  }

  return (
    <Container sx={{mt: 2}} maxWidth={false}>
      <Typography variant="h4">Все сообщения</Typography>
      <Board tableHeadCells={TableHeadCells} tableBodyCells={BodyCells} />
    </Container>
  );
};

export default AdminMessages;