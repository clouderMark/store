import { adminGetOne as getOneOrder } from "../http/orderAPI"
import Order from "../components/Order"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Container, Spinner } from "react-bootstrap"

const AdminOrder = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getOneOrder(id)
      .then(
        data => setOrder(data)
      )
      .catch(
        error => setError(error.response.data.message)
      )
      .finally(
        () => setFetching(false)
      )
  }, [id])

  if (fetching) {
    return <Spinner animation="border" />
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <Container>
      <h1> Заказ № {order.id}</h1>
      <Order data={order} admin={true} />
    </Container>
  )
}

export default AdminOrder