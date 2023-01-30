import { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { createProperty, deleteProperty, fetchBrands, fetchCategories, fetchOneProduct, updateProduct, updateProperty } from '../http/catalogAPI'
// import UpdateProperties from './UpdateProperties.js'
import EditProperties from './EditProperties'
import uuid from 'react-uuid'

const defaultValue = { name: '', price: '', category: '', brand: '' }
const defaultValid = { name: null, price: null, category: null, brand: null }

const isValid = (value) => {
  const result = {}
  const pattern = /^[1-9][0-9]*$/
  for (let key in value) {
    if (key === 'name') result.name = value.name.trim() !== ''
    if (key === 'price') result.price = pattern.test(value.price.trim())
    if (key === 'category') result.category = pattern.test(value.category)
    if (key === 'brand') result.brand = pattern.test(value.brand)
  }
  return result
}

const updateProperties = async (properties, productId) => {
  for (const prop of properties) {
    const empty = prop.name.trim() === '' || prop.value.trim() === ''
    //если характеристика пуста - удалю ее на сервере
    if (empty && prop.id) {
      try {
        await deleteProperty(productId, prop)
      } catch(error) {
        alert(error.response.data.message)
      }
      continue
    }
    /*
    *Если у объекта prop свойство append равно true - это новая хар-ка, ее нужно создать
    *Если у объекта prop свойство change равно true - хар-ка изменилась, ее нужно обновить
    *Если у объекта prop свойство remove равно true - хар-ку удалили, ее нужно удалить
    */
    if (prop.append && !empty) {
      try {
        await createProperty(productId, prop)
      } catch (error) {
        alert(error.response.data.message)
      }
      continue
    }
    if (prop.change && !prop.remove) {
      try {
        await updateProperty(productId, prop.id, prop)
      } catch (error) {
        alert(error.response.data.message)
      }
      continue
    }
    if (prop.remove) {
      try {
        await deleteProperty(productId, prop.id)
      } catch (error) {
        alert(error.response.data.message)
      }
      continue
    }
  }
}

const UpdateProduct = (props) => {
  const { id, show, setShow, setChange } = props

  const [value, setValue] = useState(defaultValue)
  const [valid, setValid] = useState(defaultValid)

  //выбранное для загрузки изображение товара
  const [image, setImage] = useState(null)

  //список характеристик товара
  const [properties, setProperties] = useState([])

  //список категорий и список брендов для возможности выбора
  const [categories, setCategories] = useState(null)
  const [brands, setBrands] = useState(null)

  useEffect(() => {
    if (id) {
      //нужно получить с сервера данные товара для редактирования
      fetchOneProduct(id)
        .then(
          data => {
            const prod = {
              name: data.name,
              price: data.price.toString(),
              category: data.categoryId.toString(),
              brand: data.brandId.toString()
            }
            setValue(prod)
            setValid(isValid(prod))
            setProperties(data.props.map(item => {
              //при добавлении новой хар-ки свойство append принимает значение true
              //при изменении старой хар-ки свойство change принимает значение true
              //при удалении старой хар-ки свойство remove принимает значение true
              return {...item, unique: uuid(), append: false, remove: false, change: false}
            }))
          }
        )
        .catch(
          error => alert(error.response.data.message)
        )
      //нужно получить с сервера список категорий и всех брендов
      fetchCategories()
        .then(
          data => setCategories(data)
        )
      fetchBrands()
        .then(
          data => setBrands(data)
        )
    }
  }, [id])

  const handleInputChange = (event) => {
    const data = { ...value, [event.target.name]: event.target.value }
    setValue(data)
    setValid(isValid(data))
  }

  const handleImageChange = (event) => {
    setImage(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const correct = isValid(value)
    setValid(correct)

    //если прошли проверку то можно отправлять на сервер
    if (correct.name && correct.price && correct.category && correct.brand) {
      const data = new FormData()
      data.append('name', value.name.trim())
      data.append('price', value.price.trim())
      data.append('categoryId', value.category)
      data.append('brandId', value.brand)
      if (image) data.append('image', image, image.name)

      //нужно обновить, добавить или удалить хар-ку и обязательно дождаться ответа
      //сервера - поэтому ф-ция updateProperties() объявлена как async, а в теле
      // ф-ции для выполнение действия с каждой хар-кой используется await
      if (properties.length) {
        await updateProperties(properties, id)
      }

      updateProduct(id, data)
        .then(
          data => {
            //сбрасываю поле загрузки изображения, чтобы при сохранении товара,
            //когда новое изображение не выбрано, не загружать старое повторно
            event.target.image.value = ''
            //в принципе мы могли бы сбросить все поля формы на дефолтные значения,
            //но если пользователь решит отредактировать тот же товар повторно, то
            //увидит пустые поля формы - http-запрос на получение данных для редактирования
            //мы выполняем только тогда, когда выбран новый товар (изминился id товара)
            const prod = {
              name: data.name,
              price: data.price.toString(),
              category: data.categoryId.toString(),
              brand: data.brandId.toString()
            }
            setValue(prod)
            setValid(isValid(prod))
            //мы получили актуальные значения хар-к с сервера, потому что обновление
            //хар-тик завершилось еще до момента отправки этого http-запроса на сервер
            setProperties(data.props.map(item => {
              return {...item, unique: uuid(), append: false, remove: false, change: false}
            }))
            //закрываю модально окно редактирования товара
            setShow(false)
            //изменяем состояние компонента списка товаров
            setChange(state => !state)
          }
        )
        .catch(
          error => alert(error.response.data.message)
        )
    }
  }

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Редактирование товара</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Control
            name="name"
            value={value.name}
            onChange={e => handleInputChange(e)}
            isValid={valid.name === true}
            isInvalid={valid.name === false}
            placeholder="Название товара..."
            className="mb-3"
          />
          <Row className="mb-3">
            <Col>
              <Form.Select
                name="category"
                value={value.category}
                onChange={e => handleInputChange(e)}
                isValid={valid.category === true}
                isInvalid={valid.category === false}
              >
                <option value="">Категория</option>
                {categories && categories.map(item =>
                  <option key={item.id} value={item.id}>{item.name}</option>
                )}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                name="brand"
                value={value.brand}
                onChange={e => handleInputChange(e)}
                isValid={valid.brand === true}
                isInvalid={valid.brand === false}
              >
                <option value="">Бренд</option>
                {brands && brands.map(item =>
                  <option key={item.id} value={item.id}>{item.name}</option>
                )}
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Control
                name="price"
                value={value.price}
                onChange={e => handleInputChange(e)}
                isValid={valid.price === true}
                isInvalid={valid.price === false}
                placeholder="Цена товара..."
              />
            </Col>
            <Col>
              <Form.Control
                name="image"
                type="file"
                onChange={e => handleImageChange(e)}
                placeholder="Фото товара..."
              />
            </Col>
          </Row>
          <EditProperties properties={properties} setProperties={setProperties}  />
          <Row>
            <Col>
                  <Button type="submit">Сохранить</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default UpdateProduct