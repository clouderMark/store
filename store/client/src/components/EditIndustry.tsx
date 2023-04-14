import React, {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FormEvent,
} from 'react';
import uuid from 'react-uuid';
import PopUpForIndystry from './PopUpForIndustry/PopUpForIndustry';
import {useAppContext} from './AppContext';
import {IParagraphs, IAreaResponse} from '../types/types';

interface IProps {
  id: number | null;
  setId: Dispatch<SetStateAction<number | null>>;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setChange: Dispatch<SetStateAction<boolean>>;
  fetch(id: number): Promise<IAreaResponse>;
  create(data: FormData): Promise<IAreaResponse>;
  updata(id: number, industry: FormData): Promise<IAreaResponse>;
  child?: {component: JSX.Element, value: string, setValue: Dispatch<SetStateAction<string>>};
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

  const [infoImage, setInfoImage] = useState<File | null>(null);
  const [infoImageUrl, setInfoImageUrl] = useState<string | null>(null);
  // const [listTitle, setListTitle] = useState('');
  // const [listParagraph, setListParagraph] = useState('');
  // const [listItems, setListItems] = useState<string[]>([]);

  const [valid, setValid] = useState<null | boolean>(null);

  useEffect(() => {
    if (id) {
      props.fetch(id)
        .then((data) => {
          setName(data.name);
          setValid(data.name !== '');
          setCardImageUrl(data.cardImage ? process.env.REACT_APP_IMG_URL + data.cardImage : '');
          setHeaderImageUrl(data.headerImage ? process.env.REACT_APP_IMG_URL + data.headerImage : '');
          setInfoImageUrl(data.info.image ? process.env.REACT_APP_IMG_URL + data.info.image : '');
          setTitle(data.title);
          setParagraphs(
            data.paragraphs.map((item) => ({...item, unique: uuid()})),
          );
          if (props.child) {
            props.child.setValue(`${data.industryId}`);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setName('');
      setValid(null);
      setCardImageUrl(null);
      setHeaderImageUrl(null);
      setInfoImageUrl(null);
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
    if (infoImage) {
      const newImageUrl = URL.createObjectURL(infoImage);

      setInfoImageUrl(newImageUrl);
    }
  }, [infoImage]);

  useEffect(() => {
    if (!show) {
      setCardImageUrl(null);
      setHeaderImageUrl(null);
      setInfoImageUrl(null);
      setId(null);
      setName('');
      setTitle('');
      setParagraphs([]);
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
      } else if (inputName === 'infoImage') {
        setInfoImage(file);
      }
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const correct = name.trim() !== '';

    setValid(correct);
    if (correct) {
      const data = new FormData();

      if (props.child) {
        data.append('industryId', props.child.value.trim());
      }

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

      if (infoImage) {
        data.append('infoImage', infoImage, infoImage.name);
      }

      const success = () => {
        // закрываем модальное окно
        setShow(false);
        // изменяю состояние родителя, чтобы обновить список индустрий
        setChange((state) => !state);
      };

      if (id) {
        props.updata(id, data)
          .then((data) => {
            success();
            setCardImageUrl(data.cardImage ? process.env.REACT_APP_IMG_URL + data.cardImage : null);
            setHeaderImageUrl(data.headerImage ? process.env.REACT_APP_IMG_URL + data.headerImage : null);
            if (props.child) {
              catalog.subIndustries = [...catalog.subIndustries.filter((el) => el.id !== data.id), data];
            } else {
              catalog.industries = [...catalog.industries.filter((el) => el.id !== data.id), data];
            }
          })
          .catch((error) => console.error(error));
      } else {
        props.create(data)
          .then((data) => {
            success();
            if (props.child) {
              catalog.subIndustries = [...catalog.subIndustries, data];
            } else {
              catalog.industries = [...catalog.industries, data];
            }

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
      infoImage={infoImageUrl}
      handleImageChange={handleImageChange}
      valid={valid}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      title={title}
      paragraphs={paragraphs}
      setParagraphs={setParagraphs}
      child={props.child}
    />
  );
};

export default EditIndustry;
