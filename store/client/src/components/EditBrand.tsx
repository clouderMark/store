import React, {Dispatch, SetStateAction, useEffect, useState, ChangeEvent, FormEvent, useRef} from 'react';
import {fetchBrand, createBrand, updateBrand} from '../http/catalogAPI';
import {PopUp} from './PopUp';

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

  const inputRef = useRef<HTMLInputElement>(null);

  if (show) {
    if (inputRef && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

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
    <PopUp
      title="бренда"
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

export default EditBrand;
