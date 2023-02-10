import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import {fetchBrand, createBrand, updateBrand} from '../http/catalogAPI';

interface IProps {
  id: number;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setChange: Dispatch<SetStateAction<boolean>>;
}

const EditBrand = (props: IProps) => {
  const {id, show, setShow, setChange} = props;

  const [name, setName] = useState('');
  const [valid, setValid] = useState<null | boolean>(null);

  useEffect(() => {
    if (id) {
      fetchBrand(id)
        .then((data) => {
          setName(data.name);
          setValid(data.name !== '');
        })
        .catch((error) => console.error(error));
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
        // закрываю окно создания редактирования бренда
        setShow(false);
        // измения состояние родителя, чтобы обновить список брендов
        setChange((state) => !state);
      };

      if (id) {
        updateBrand(id, data)
          .then(success)
          .catch((error) => console.error(error));
      } else {
        createBrand(data)
          .then(success)
          .catch((error) => console.error(error));
      }
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{id ? 'Редактирование' : 'Создание'} бренда</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Control
            name="name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            isValid={valid === true}
            isInvalid={valid === false}
            placeholder="Название бренда..."
            className="mb-3"
          />
          <Button type="submit">Сохранить</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditBrand;
