import { useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { createBrand } from "../http/catalogAPI"

const CreateBrand = (props) => {
  const { show, setShow, setChange } = props

  const [name, setName] = useState('')
  const [valid, setValid] = useState(null)
  
  const handleChange = (event) => {
    setName(event.target.value)
    setValid(event.target.value.trim() !== '')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const correct = name.trim() !== ''
    setValid(correct)
    if (correct) {
      const data = {
        name: name.trim()
      }
      createBrand(data)
        .then(
          data => {
            //изменяю состояние компонента списка брендов
            setChange(true)
            //готовлю форсу к созданию еще одного бренда
            setName('')
            setValid(null)
            //закрываю модальное окно
            setShow(false)
          }
        )
        .catch(
          error => alert(error.response.data.message)
        )
    }
  }

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Новый бренд</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Control 
            name="name"
            value={name}
            onChange={e => handleChange(e)}
            isValid={valid === true}
            isInvalid={valid === false}
            placeholder="Название бренда..."
            className="mb-3"
          />
          <Button type="submit">Сохранить</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateBrand 