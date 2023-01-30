import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { createCategory } from "../http/catalogAPI"

const CreateCategory = (props) => {
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
      createCategory(data)
        .then(
          data => {
            //готовим форму к созданию еще одной категории
            setName('')
            setValid(null)
            //закрываем модальное окно создания категории
            setShow(false)
            //изменяем состояние компонента списка
            setChange(state => !state)
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
        <Modal.Title>Новая категория</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Control 
            name="name"
            value={name}
            onChange={e => handleChange(e)}
            isValid={valid === true}
            isInvalid={valid === false}
            placeholder="Название категории..."
            className="mt-3"
          />
          <Button type="submit">Сохранить</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateCategory