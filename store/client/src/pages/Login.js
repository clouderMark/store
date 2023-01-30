import { observer } from "mobx-react-lite"
import { useContext, useEffect } from "react"
import { Button, Card, Container, Form, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../components/AppContext.js"
import { login } from '../http/userAPI.js'

const Login = observer(() => {
    const { user } = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user.isAdmin) navigate('/admin', {replace: true})
        if (user.isAuth) navigate('/user', {replace: true})
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const email = event.target.email.value.trim()
        const password = event.target.password.value.trim()
        const data = await login(email, password)
        if (data) {
            user.login(data)
            if (user.isAdmin) navigate('/admin')
            if (user.isAuth) navigate('/user')
        }
    }

    return (
        <Container className="d-flex justify-content-center">
            <Card style={{ width: '50%' }} className="p-2 mt-5 bg-light">
                <h3 className="m-auto">Авторизация</h3>
                <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <Form.Control
                        name="email"
                        className="mt-3"
                        placeholder="Введите ваш email..."
                    />
                    <Form.Control
                        name="password"
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                    />
                    <Row className="d-flex justify-content-between mt-2 mb-2 p-3">
                        <Button type="submit">
                            Войти
                        </Button>
                        <p>
                            Нет аккаунта?
                            <Link to="/signup">Зарегистрируйтесь!</Link>
                        </p>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
})

export default Login