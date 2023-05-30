import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Container, Typography, TableCell, TableRow, Button} from '@mui/material';
import {adminGetAllMessages, adminDelete} from '../../http/contactAPI';
import {IMessage} from '../../types/types';
import Progress from '../../components/LinearDeterminate';
import {Board} from '../../components/Board';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import TableCells from '../../components/TableCells/TableCells';
import {adminMessagesCells} from '../../components/TableCells/cells';
import AlertLine from '../../components/AlertLine/AlertLine';

const AdminMessages = () => {
  const [messages, setMessages] = useState<null | IMessage[]>(null);
  const [fetching, setFetching] = useState(true);
  const [alertOnDelete, setAlertOnDelete] = useState<false | string>(false);

  const handleDeleteClick = (id: number) => {
    adminDelete(id).then((data) => {
      setAlertOnDelete(`Сообщение №${data.id} удалено`);
      setTimeout(() => {
        setAlertOnDelete(false);
      }, 5000);
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

  if (fetching) {
    return <Progress />;
  }

  return (
    <>
      <Breadcrumbs />
      <Container sx={{mt: 2, mb: 10}} maxWidth={false}>
        <Typography variant="h4">Все сообщения</Typography>
        <Board
          tableHeadCells={<TableCells cells={adminMessagesCells} />}
          tableBodyCells={
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
          }
        />
      </Container>
      {alertOnDelete ? <AlertLine content={alertOnDelete} success={Boolean(alertOnDelete)} /> : null}
    </>
  );
};

export default AdminMessages;
