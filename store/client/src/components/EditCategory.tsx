import React, {useEffect, useState, Dispatch, SetStateAction, ChangeEvent, FormEvent, useRef} from 'react';
import {createCategory, fetchCategory, updateCategory} from '../http/catalogAPI';
import {PopUp} from './PopUp';

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

  const inputRef = useRef<HTMLInputElement>(null);

  if (show) {
    if (inputRef && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setValid(event.target.value.trim() !== '');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
    <PopUp
      title="категории"
      show={show}
      setShow={setShow}
      id={id}
      name={name}
      valid={valid}
      inputRef={inputRef}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};

export default EditCategory;
