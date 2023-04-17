import React, {useEffect, useState, Dispatch, SetStateAction, ChangeEvent, FormEvent} from 'react';
import uuid from 'react-uuid';
import PopUpForIndystry from './PopUpForIndustry/PopUpForIndustry';
import {useAppContext} from './AppContext';
import {IParagraphs, IAreaResponse} from '../types/types';
import filterParagraphs from './EditIndustry/filterParagraphs';

interface IProps {
  id: number | null;
  setId: Dispatch<SetStateAction<number | null>>;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setChange: Dispatch<SetStateAction<boolean>>;
  fetch(id: number): Promise<IAreaResponse>;
  create(data: FormData): Promise<IAreaResponse>;
  updata(id: number, industry: FormData): Promise<IAreaResponse>;
  child?: {component: JSX.Element; value: string; setValue: Dispatch<SetStateAction<string>>};
}

const EditIndustry = (props: IProps) => {
  const {catalog} = useAppContext();
  const {id, show, setShow, setChange, setId} = props;

  const [name, setName] = useState('');

  const [cardImage, setCardImage] = useState<File | null>(null);
  const [cardImageUrl, setCardImageUrl] = useState('');

  const [headerImage, setHeaderImage] = useState<File | null>(null);
  const [headerImageUrl, setHeaderImageUrl] = useState('');

  const [title, setTitle] = useState('');
  const [paragraphs, setParagraphs] = useState<IParagraphs[]>([]);

  const [infoImage, setInfoImage] = useState<File | null>(null);
  const [infoImageUrl, setInfoImageUrl] = useState('');
  const [infoTitle, setInfoTitle] = useState('');
  const [infoHeader, setInfoHeader] = useState('');
  const [infoListTitle, setInfoListTitle] = useState('');
  const [infoListItems, setInfoListItems] = useState<IParagraphs[]>([]);
  const [infoParagraphs, setInfoParagraphs] = useState<IParagraphs[]>([]);

  const [valid, setValid] = useState<null | boolean>(null);

  useEffect(() => {
    if (id) {
      props
        .fetch(id)
        .then((data) => {
          setName(data.name);
          setValid(data.name !== '');
          setCardImageUrl(data.cardImage ? process.env.REACT_APP_IMG_URL + data.cardImage : '');
          setHeaderImageUrl(data.headerImage ? process.env.REACT_APP_IMG_URL + data.headerImage : '');
          setTitle(data.title);
          setParagraphs(data.paragraphs.map((item) => ({...item, unique: uuid()})));
          if (props.child) {
            props.child.setValue(`${data.industryId}`);
          }

          setInfoImageUrl(data.info.image ? process.env.REACT_APP_IMG_URL + data.info.image : '');
          setInfoTitle(data.info.title);
          setInfoHeader(data.info.header);
          setInfoListTitle(data.info.listTitle);
          setInfoListItems(data.info.listItems.map((item) => ({...item, unique: uuid()})));
          setInfoParagraphs(data.info.paragraphs.map((item) => ({...item, unique: uuid()})));
        })
        .catch((error) => console.log(error));
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
      setCardImageUrl('');
      setHeaderImageUrl('');
      setId(null);
      setName('');
      setTitle('');
      setParagraphs([]);
      setInfoImageUrl('');
      setInfoTitle('');
      setInfoListTitle('');
      setInfoListItems([]);
      setInfoParagraphs([]);
      props.child?.setValue('');
    }
  }, [show]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'name') {
      setName(event.target.value);
      setValid(event.target.value.trim() !== '');
    } else if (event.target.name === 'title') {
      setTitle(event.target.value);
    } else if (event.target.name === 'infoTitle') {
      setInfoTitle(event.target.value);
    } else if (event.target.name === 'infoHeader') {
      setInfoHeader(event.target.value);
    } else if (event.target.name === 'listTitle') {
      setInfoListTitle(event.target.value);
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
        const items = filterParagraphs(paragraphs);

        if (items.length) {
          data.append('paragraphs', JSON.stringify(items));
        }
      }

      if (infoImage) {
        data.append('infoImage', infoImage, infoImage.name);
      }

      data.append('infoTitle', infoTitle.trim());
      data.append('infoHeader', infoHeader.trim());
      data.append('listTitle', infoListTitle.trim());

      if (infoListItems.length) {
        const items = filterParagraphs(infoListItems);

        if (items.length) {
          data.append('listItems', JSON.stringify(items));
        }
      }

      if (infoParagraphs.length) {
        const items = filterParagraphs(infoParagraphs);

        if (items.length) {
          data.append('infoParagraphs', JSON.stringify(items));
        }
      }

      const success = () => {
        // закрываем модальное окно
        setShow(false);
        // изменяю состояние родителя, чтобы обновить список индустрий
        setChange((state) => !state);
      };

      if (id) {
        props
          .updata(id, data)
          .then((data) => {
            success();
            if (props.child) {
              catalog.subIndustries = [...catalog.subIndustries.filter((el) => el.id !== data.id), data];
            } else {
              catalog.industries = [...catalog.industries.filter((el) => el.id !== data.id), data];
            }
          })
          .catch((error) => console.error(error));
      } else {
        props
          .create(data)
          .then((data) => {
            success();
            if (props.child) {
              catalog.subIndustries = [...catalog.subIndustries, data];
            } else {
              catalog.industries = [...catalog.industries, data];
            }
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
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      title={title}
      paragraphs={paragraphs}
      setParagraphs={setParagraphs}
      infoImage={infoImageUrl}
      infoTitle={infoTitle}
      infoHeader={infoHeader}
      infoListTitle={infoListTitle}
      infoListItems={infoListItems}
      setInfoListItems={setInfoListItems}
      infoParagraphs={infoParagraphs}
      setInfoParagraphs={setInfoParagraphs}
      child={props.child}
    />
  );
};

export default EditIndustry;
