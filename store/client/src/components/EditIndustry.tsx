import React, {useEffect, useState, Dispatch, SetStateAction, ChangeEvent, FormEvent, useRef} from 'react';
import {createIndustry, fetchIndustry, updateIndustry} from '../http/catalogAPI';
import PopUpForIndystry from './PopUpForIndustry/PopUpForIndustry';
import {useAppContext} from './AppContext';

interface IProps {
  id: number | null;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setChange: Dispatch<SetStateAction<boolean>>;
}

const EditIndustry = (props: IProps) => {
  const {catalog} = useAppContext();
  const {id, show, setShow, setChange} = props;

  const [name, setName] = useState('');
  const [cardImage, setCardImage] = useState<File | null>(null);
  const [fetchedCardImage, setFetchedCardImage] = useState<string | null>(null);
  // const [viewImage, setViewImage] = useState<File | null>(null);
  // const [title, setTitle] = useState('');
  // const [paragraph, setParagraph] = useState('');

  // const [listImage, setListImage] = useState<File | null>(null);
  // const [listTitle, setListTitle] = useState('');
  // const [listParagraph, setListParagraph] = useState('');
  // const [listItems, setListItems] = useState<string[]>([]);

  const [valid, setValid] = useState<null | boolean>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  if (show) {
    if (inputRef && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  useEffect(() => {
    if (id) {
      fetchIndustry(id)
        .then((data) => {
          setName(data.name);
          setValid(data.name !== '');
          setFetchedCardImage(data.cardImage);
        })
        .catch((error) => console.log(error));
    } else {
      setName('');
      setValid(null);
      setFetchedCardImage('');
    }
  }, [id]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setValid(event.target.value.trim() !== '');
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      const file = event.target.files[0];

      setCardImage(file);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const correct = name.trim() !== '';

    setValid(correct);
    if (correct) {
      const data = new FormData();

      data.append('name', name.trim());
      if (cardImage) {
        data.append('cardImage', cardImage, cardImage.name);
      }

      const success = () => {
        // закрываем модальное окно
        setShow(false);
        // изменяю состояние родителя, чтобы обновить список индустрий
        setChange((state) => !state);
      };

      if (id) {
        updateIndustry(id, data)
          .then((data) => {
            success();
            setFetchedCardImage(data.cardImage);
            catalog.industries = [...catalog.industries.filter((el) => el.id !== data.id), data];
          })
          .catch((error) => console.error(error));
      } else {
        createIndustry(data)
          .then((data) => {
            success();
            catalog.industries = [...catalog.industries, data];
          })
          .catch((error) => console.error(error));
      }
    }
  };

  return (
    <PopUpForIndystry
      title="индустрии"
      show={show}
      setShow={setShow}
      id={id}
      name={name}
      fetchedCardImage={fetchedCardImage}
      handleImageChange={handleImageChange}
      valid={valid}
      inputRef={inputRef}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};

export default EditIndustry;
