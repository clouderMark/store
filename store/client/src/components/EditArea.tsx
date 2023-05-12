import React, {Dispatch, SetStateAction, useEffect, useState, ChangeEvent, FormEvent, useRef} from 'react';
import {fetchArea, createArea, updateArea} from '../http/catalogAPI';
import PopUp from './PopUps/PopUp';

interface IProps {
  id: number;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setChange: Dispatch<SetStateAction<boolean>>;
}

const EditArea = (props: IProps) => {
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
      fetchArea(id)
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
        // закрываю окно создания редактирования решения
        setShow(false);
        // измения состояние родителя, чтобы обновить список решений
        setChange((state) => !state);
      };

      if (id) {
        updateArea(id, data)
          .then(success)
          .catch((error) => console.error(error));
      } else {
        createArea(data)
          .then(success)
          .catch((error) => console.error(error));
      }
    }
  };

  return (
    <PopUp
      title="области применения"
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

export default EditArea;
