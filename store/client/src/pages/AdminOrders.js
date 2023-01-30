import { useState, useEffect } from "react"
import { adminGetAll as getAllOrders } from "../http/orderAPI"
import Orders from "../components/Orders"
import { Container, Spinner } from "react-bootstrap"

const AdminOrders = () => {
  const [orders, setOrders] = useState(null)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    getAllOrders()
      .then(
        data => setOrders(data)
      )
      .finally(
        () => setFetching(false)
      )
  }, [])

  if (fetching) {
    return <Spinner animation="border"/>
  }

  return (
    <Container>
      <h1>Все заказы</h1>
      <Orders items={orders} admin={true}/>
    </Container>
  )
}

export default AdminOrders