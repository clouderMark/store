import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Container, Typography, Button} from '@mui/material';
import Propgress from '../../components/LinearDeterminate';
import {adminGetOneMessage, adminDelete} from '../../http/contactAPI';
import {IMessage} from '../../types/types';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import AlertLine from '../../components/AlertLine/AlertLine';

const AdminMessage = () => {
  const {id} = useParams();
  const [message, setMessage] = useState<null | IMessage>(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const history = useNavigate();
  const [alertOnDelete, setAlertOnDelete] = useState<false | string>(false);

  useEffect(() => {
    adminGetOneMessage(+id!)
      .then((data) => setMessage(data))
      .catch((error) => setError(error.response.data.message))
      .finally(() => setFetching(false));
  }, [id]);

  const handleDeleteClick = (id: number) => {
    adminDelete(id).then((data) => {
      setAlertOnDelete(`Сообщение №${data.id} удалено`);
      setTimeout(() => {
        setAlertOnDelete(false);
      }, 5000);

      history({
        pathname: '/admin/messages',
      });
    });
  };

  if (fetching) {
    return <Propgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Breadcrumbs />
      <Container sx={{mt: 2}}>
        <Typography variant="h4"> Сообщение № {message?.id}</Typography>
        <Typography variant="body1">От: {message?.name}</Typography>
        <Typography variant="body1">Компания: {message?.company}</Typography>
        <Typography variant="body1">
          Тип вопроса: {message?.type === 'commercial' ? 'коммерческий' : 'личный'}
        </Typography>
        <Typography variant="body1">Как со мной связаться: </Typography>
        <Typography variant="body1">телефон: {message?.phone}</Typography>
        <Typography variant="body1">mail: {message?.email}</Typography>
        <Typography variant="body1">Тема вопроса: {message?.question}</Typography>
        <Button variant="outlined" onClick={() => handleDeleteClick(message!.id)} color="warning">
          Удалить
        </Button>
      </Container>
      {alertOnDelete ? <AlertLine content={alertOnDelete} success={Boolean(alertOnDelete)} /> : null}
    </>
  );
};

export default AdminMessage;
