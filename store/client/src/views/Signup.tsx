import {observer} from 'mobx-react-lite';
import {useEffect, FormEvent} from 'react';
import {Button, Card, Container, Form, Row} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {useAppContext} from '../components/AppContext';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import {signup} from '../http/userAPI';

const Signup = observer(() => {
  const {user} = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAdmin) navigate('/admin', {replace: true});
    if (user.isAuth) navigate('/user', {replace: true});
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const email = target.email.value.trim();
    const password = target.password.value.trim();
    const data = await signup(email, password);

    if (data) {
      user.login(data);
      if (user.isAdmin) navigate('/admin');
      if (user.isAuth) navigate('/user');
    }
  };

  return (
    <>
      <Breadcrumbs />
      <Container className="d-flex justify-content-center">
        <Card style={{width: '50%'}} className="p-2 mt-5 bg-light">
          <h3 className="m-auto">Регистрация</h3>
          <Form className="d-flex flex-column" onSubmit={handleSubmit}>
            <Form.Control name="email" className="mt-3" placeholder="Введите ваш email..." />
            <Form.Control name="password" className="mt-3" placeholder="Введите ваш пароль..." />
            <Row className="d-flex justify-content-between mt-2 mb-2 p-3">
              <Button type="submit">Регистрация</Button>
              <p>
                Уже есть аккаунт?
                <Link to="/login">Войдите!</Link>
              </p>
            </Row>
          </Form>
        </Card>
      </Container>
    </>
  );
});

export default Signup;
