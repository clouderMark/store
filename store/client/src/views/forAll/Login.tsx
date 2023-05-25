import {observer} from 'mobx-react-lite';
import {useEffect, FormEvent} from 'react';
import {Box, Button, Card, Container, TextField, Typography} from '@mui/material';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useAppContext} from '../../components/AppContext';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import {login} from '../../http/userAPI';
import {EPath} from '../../enums/EPath';

const Login = observer(() => {
  const {user} = useAppContext();
  const navigate = useNavigate();
  const isLogin = useLocation().pathname === EPath.Login;

  useEffect(() => {
    if (user.isAdmin) navigate(EPath.Admin, {replace: true});
    if (user.isAuth) navigate(EPath.User, {replace: true});
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const email = target.email.value.trim();
    const password = target.password.value.trim();
    const data = await login(email, password);

    if (data) {
      user.login(data);
      if (user.isAdmin) navigate(EPath.Admin);
      if (user.isAuth) navigate(EPath.User);
    }
  };

  return (
    <>
      <Breadcrumbs />
      <Container sx={{display: 'flex', justifyContent: 'center'}}>
        <Card style={{width: '50%'}} sx={{p: 5, mb: 15}}>
          <Typography component="h3" sx={{color: '#6f6f6f', mt: 'auto'}}>
            {isLogin ? 'Авторизация' : 'Регистрация'}
          </Typography>
          <Box component="form" sx={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit}>
            <TextField name="email" sx={{mt: 3}} placeholder="Введите ваш email..." />
            <TextField name="password" sx={{mt: 3}} placeholder="Введите ваш пароль..." />
            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2, p: 3}}>
              <Button type="submit" color="first" variant="outlined">
                {isLogin ? 'Войти' : 'Регистрация'}
              </Button>
              <Typography sx={{color: '#6f6f6f', mt: 'auto'}}>
                {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                <Link to={isLogin ? EPath.Signup : EPath.Login}>
                  {isLogin ? ' Зарегистрируйтесь!' : ' Войдите!'}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Card>
      </Container>
    </>
  );
});

export default Login;
