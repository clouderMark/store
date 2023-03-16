import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Container, Typography, Button} from '@mui/material';
import Propgress from '../components/LinearDeterminate';
import {adminGetOneMessage, adminDelete} from '../http/contactAPI';
import {IMessage} from '../types/types';

const AdminMessage = () => {
  const {id} = useParams();
  const [message, setMessage] = useState<null | IMessage>(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    adminGetOneMessage(+id!)
      .then((data) => setMessage(data))
      .catch((error) => setError(error.response.data.message))
      .finally(() => setFetching(false));
  }, [id]);

  const handleDeleteClick = (id: number) => {
    adminDelete(id).then((data) => {
      alert(`Сообщение №${data.id} удалено`);

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
    <Container sx={{mt: 2}}>
      <Typography variant="h4"> Сообщение № {message?.id}</Typography>
      <Typography variant="body1">От: {message?.name}</Typography>
      <Typography variant="body1">Компания: {message?.company}</Typography>
      <Typography variant="body1">Тип вопроса: {message?.type === 'commercial' ? 'коммерческий' : 'личный'}</Typography>
      <Typography variant="body1">Как со мной связаться: </Typography>
      <Typography variant="body1">телефон: {message?.phone}</Typography>
      <Typography variant="body1">mail: {message?.email}</Typography>
      <Typography variant="body1">Тема вопроса: {message?.question}</Typography>
      <Button
        variant="outlined"
        onClick={() => handleDeleteClick(message!.id)}
        color="warning"
      >
        Удалить
      </Button>
    </Container>
  );
};

export default AdminMessage;
