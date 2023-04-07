import React, {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FormEvent,
  //  useRef
} from 'react';
import {createIndustry, fetchIndustry, updateIndustry} from '../http/catalogAPI';
import PopUpForIndystry from './PopUpForIndustry/PopUpForIndustry';
import {useAppContext} from './AppContext';
import {IParagraphs} from '../types/types';

interface IProps {
  id: number | null;
  setId: Dispatch<SetStateAction<number | null>>;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setChange: Dispatch<SetStateAction<boolean>>;
}

const EditIndustry = (props: IProps) => {
  const {catalog} = useAppContext();
  const {id, show, setShow, setChange, setId} = props;

  const [name, setName] = useState('');

  const [cardImage, setCardImage] = useState<File | null>(null);
  const [cardImageUrl, setCardImageUrl] = useState<string | null>(null);

  const [headerImage, setHeaderImage] = useState<File | null>(null);
  const [headerImageUrl, setHeaderImageUrl] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [paragraphs, setParagraphs] = useState<IParagraphs[]>([]);

  // const [listImage, setListImage] = useState<File | null>(null);
  // const [listTitle, setListTitle] = useState('');
  // const [listParagraph, setListParagraph] = useState('');
  // const [listItems, setListItems] = useState<string[]>([]);

  const [valid, setValid] = useState<null | boolean>(null);

  // const inputRef = useRef<HTMLInputElement>(null);

  // if (show) {
  //   if (inputRef && inputRef.current) {
  //     setTimeout(() => inputRef.current?.focus(), 100);
  //   }
  // }

  useEffect(() => {
    if (id) {
      fetchIndustry(id)
        .then((data) => {
          setName(data.name);
          setValid(data.name !== '');
          setCardImageUrl(data.cardImage ? process.env.REACT_APP_IMG_URL + data.cardImage : '');
          setHeaderImageUrl(data.headerImage ? process.env.REACT_APP_IMG_URL + data.headerImage : '');
          setTitle(data.title);
          console.log(data);
        })
        .catch((error) => console.log(error));
    } else {
      setName('');
      setValid(null);
      setCardImageUrl(null);
      setHeaderImageUrl(null);
      setTitle('');
    }
  }, [id]);

  useEffect(() => {
    if (headerImage) {
      const newImageUrl = URL.createObjectURL(headerImage);

      setHeaderImageUrl(newImageUrl);
    }
  }, [headerImage]);

  useEffect(() => {
    if (cardImage) {
      const newImageUrl = URL.createObjectURL(cardImage);

      setCardImageUrl(newImageUrl);
    }
  }, [cardImage]);

  useEffect(() => {
    if (!show) {
      setCardImageUrl(null);
      setHeaderImageUrl(null);
      setId(null);
      setName('');
      setTitle('');
    }
  }, [show]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'name') {
      setName(event.target.value);
      setValid(event.target.value.trim() !== '');
    } else if (event.target.name === 'title') {
      setTitle(event.target.value);
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      const file = event.target.files[0];
      const inputName = event.target.name;

      if (inputName === 'cardImage') {
        setCardImage(file);
      } else if (inputName === 'headerImage') {
        setHeaderImage(file);
      }
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const correct = name.trim() !== '';

    setValid(correct);
    if (correct) {
      const data = new FormData();

      data.append('name', name.trim());
      data.append('title', title.trim());
      if (cardImage) {
        data.append('cardImage', cardImage, cardImage.name);
      }

      if (headerImage) {
        data.append('headerImage', headerImage, headerImage.name);
      }

      if (paragraphs.length) {
        const items = paragraphs.filter((item) => item.value.trim() !== '');

        if (items.length) {
          data.append('paragraphs', JSON.stringify(items));
        }
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
            setCardImageUrl(data.cardImage ? process.env.REACT_APP_IMG_URL + data.cardImage : null);
            setHeaderImageUrl(data.headerImage ? process.env.REACT_APP_IMG_URL + data.headerImage : null);
            catalog.industries = [...catalog.industries.filter((el) => el.id !== data.id), data];
          })
          .catch((error) => console.error(error));
      } else {
        createIndustry(data)
          .then((data) => {
            success();
            catalog.industries = [...catalog.industries, data];
            setParagraphs([]);
          })
          .catch((error) => console.error(error));
      }
    }
  };

  return (
    <PopUpForIndystry
      cardTitle="индустрии"
      show={show}
      setShow={setShow}
      id={id}
      name={name}
      cardImage={cardImageUrl}
      headerImage={headerImageUrl}
      handleImageChange={handleImageChange}
      valid={valid}
      // inputRef={inputRef}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      title={title}
      paragraphs={paragraphs}
      setParagraphs={setParagraphs}
    />
  );
};

export default EditIndustry;
