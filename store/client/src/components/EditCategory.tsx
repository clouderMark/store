import React, {useEffect, useState, Dispatch, SetStateAction} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import {createCategory, fetchCategory, updateCategory} from '../http/catalogAPI';

interface IProps {
  id: number | null;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setChange: Dispatch<SetStateAction<boolean>>;
}

const EditCategory = (props: IProps) => {
  const {id, show, setShow, setChange} = props;

  const [name, setName] = useState('');
  const [valid, setValid] = useState<null | boolean>(null);

  useEffect(() => {
    if (id) {
      fetchCategory(id)
        .then((data) => {
          setName(data.name);
          setValid(data.name !== '');
        })
        .catch((error) => console.log(error));
    } else {
      setName('');
      setValid(null);
    }
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setValid(event.target.value.trim() !== '');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const correct = name.trim() !== '';

    setValid(correct);
    if (correct) {
      const data = {
        name: name.trim(),
      };
      const success = () => {
        // закрываем модальное окно
        setShow(false);
        // изменяю состояние родителя, чтобы обновить список категорий
        setChange((state) => !state);
      };

      if (id) {
        updateCategory(id, data)
          .then(success)
          .catch((error) => console.error(error));
      } else {
        createCategory(data)
          .then(success)
          .catch((error) => console.error(error));
      }
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{id ? 'Редактирование' : 'Создание'} категории</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Control
            name="name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            isValid={valid === true}
            isInvalid={valid === false}
            placeholder="Название категории..."
            className="mb-3"
          />
          <Button type="submit">Сохранить</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditCategory;
