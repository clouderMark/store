import { useContext, useEffect, useState } from "react"
import { Button, Col, Container, Image, Row, Spinner, Table } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { AppContext } from "../components/AppContext.js"
import { append } from "../http/basketAPI.js"
import { fetchOneProduct, fetchProdRating } from "../http/catalogAPI.js"

const Product = () => {
    const { id } = useParams()
    const { basket } = useContext(AppContext)
    const [product, setProduct] = useState(null)
    const [rating, setRating] = useState(null)

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
        fetchProdRating(id).then(data => setRating(data))
    }, [id])

    const handleClick = (productId) => {
        append(productId).then(data => {
            basket.products = data.products
        })
    }

    if (!product) {
        return <Spinner animation="border" />
    }

    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col>
                    {product.image ? (
                        <Image width={300} height={300} src={process.env.REACT_APP_IMG_URL + product.image} />
                    ) : (
                        <Image width={300} height={300} src="http://via.placeholder.com/300" />
                    )}
                </Col>
                <Col>
                    <h1>{product.name}</h1>
                    <h3>{product.price}.00 руб</h3>
                    <p>Бренд: {product.brand.name}</p>
                    <p>Категория: {product.category.name}</p>
                    <div>
                        {rating ? (
                            <p>Рейтинг: {rating.rating}, голосов {rating.votes}</p>
                        ) : (
                            <Spinner animation="border" />
                        )}
                    </div>
                    <Button onClick={() => handleClick(product.id)}>Добавить в корзину</Button>
                </Col>
            </Row>
            {!!product.props.length &&
                <Row>
                    <Col>
                        <h3>Характеристики</h3>
                        <Table bordered hover size="sm">
                            <tbody>
                                {product.props.map(item =>
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.value}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            }
        </Container>
    )
}

export default Product