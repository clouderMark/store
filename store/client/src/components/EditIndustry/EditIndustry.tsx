import React, {useEffect, useState, Dispatch, SetStateAction, ChangeEvent, FormEvent, useReducer} from 'react';
import uuid from 'react-uuid';
import PopUpForIndystry from '../PopUpForIndustry/PopUpForIndustry';
import {useAppContext} from '../AppContext';
import {IParagraphs, IAreaResponse} from '../../types/types';
import filterParagraphs from './filterParagraphs';
import {reducer, IDefaultValue, initState} from './reducer';
import {EType} from './EType';

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

const defaultValue: IDefaultValue = {
  name: '',
  cardImage: null,
  cardImageUrl: '',
  headerImage: null,
  headerImageUrl: '',
  title: '',
  infoImage: null,
  infoImageUrl: '',
  infoTitle: '',
  infoHeader: '',
  infoListTitle: '',
};

const EditIndustry = (props: IProps) => {
  const {catalog} = useAppContext();
  const {id, show, setShow, setChange, setId} = props;

  const [paragraphs, setParagraphs] = useState<IParagraphs[]>([]);
  const [infoListItems, setInfoListItems] = useState<IParagraphs[]>([]);
  const [infoParagraphs, setInfoParagraphs] = useState<IParagraphs[]>([]);

  const [value, dispatch] = useReducer(reducer, defaultValue, initState);

  const [valid, setValid] = useState<null | boolean>(null);

  useEffect(() => {
    if (id) {
      props
        .fetch(id)
        .then((data) => {
          dispatch({type: EType.name, payload: data.name});
          setValid(data.name !== '');
          dispatch({
            type: EType.cardImageUrl,
            payload: data.cardImage ? process.env.REACT_APP_IMG_URL + data.cardImage : '',
          });
          dispatch({
            type: EType.headerImageUrl,
            payload: data.headerImage ? process.env.REACT_APP_IMG_URL + data.headerImage : '',
          });
          dispatch({
            type: EType.title,
            payload: data.title,
          });
          setParagraphs(data.paragraphs.map((item) => ({...item, unique: uuid()})));
          if (props.child) {
            props.child.setValue(`${data.industryId}`);
          }

          dispatch({
            type: EType.infoImageUrl,
            payload: data.info.image ? process.env.REACT_APP_IMG_URL + data.info.image : '',
          });
          dispatch({type: EType.infoTitle, payload: data.info.title});
          dispatch({type: EType.infoHeader, payload: data.info.header});
          dispatch({type: EType.infoListTitle, payload: data.info.listTitle});
          setInfoListItems(data.info.listItems.map((item) => ({...item, unique: uuid()})));
          setInfoParagraphs(data.info.paragraphs.map((item) => ({...item, unique: uuid()})));
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  useEffect(() => {
    if (value.headerImage) {
      const newImageUrl = URL.createObjectURL(value.headerImage);

      dispatch({type: EType.headerImageUrl, payload: newImageUrl});
    }
  }, [value.headerImage]);

  useEffect(() => {
    if (value.cardImage) {
      const newImageUrl = URL.createObjectURL(value.cardImage);

      dispatch({type: EType.cardImageUrl, payload: newImageUrl});
    }
  }, [value.cardImage]);

  useEffect(() => {
    if (value.infoImage) {
      const newImageUrl = URL.createObjectURL(value.infoImage);

      dispatch({type: EType.infoImageUrl, payload: newImageUrl});
    }
  }, [value.infoImage]);

  useEffect(() => {
    if (!show) {
      setId(null);
      dispatch({type: EType.reset, payload: defaultValue});
      setParagraphs([]);
      setInfoListItems([]);
      setInfoParagraphs([]);
      props.child?.setValue('');
    }
  }, [show]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === EType.name) {
      setValid(event.target.value.trim() !== '');
    }

    dispatch({type: event.target.name, payload: event.target.value});
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      const file = event.target.files[0];
      const inputName = event.target.name;

      dispatch({type: inputName, payload: file});
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const correct = value.name.trim() !== '';

    setValid(correct);
    if (correct) {
      const data = new FormData();

      if (props.child) {
        data.append('industryId', props.child.value.trim());
      }

      data.append(EType.name, value.name.trim());
      data.append(EType.title, value.title.trim());
      if (value.cardImage) {
        data.append(EType.cardImage, value.cardImage, value.cardImage.name);
      }

      if (value.headerImage) {
        data.append(EType.headerImage, value.headerImage, value.headerImage.name);
      }

      if (paragraphs.length) {
        const items = filterParagraphs(paragraphs);

        if (items.length) {
          data.append('paragraphs', JSON.stringify(items));
        }
      }

      if (value.infoImage) {
        data.append(EType.infoImage, value.infoImage, value.infoImage.name);
      }

      data.append(EType.infoTitle, value.infoTitle.trim());
      data.append(EType.infoHeader, value.infoHeader.trim());
      data.append('listTitle', value.infoListTitle.trim());

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
      handleImageChange={handleImageChange}
      valid={valid}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      paragraphs={paragraphs}
      setParagraphs={setParagraphs}
      infoListItems={infoListItems}
      setInfoListItems={setInfoListItems}
      infoParagraphs={infoParagraphs}
      setInfoParagraphs={setInfoParagraphs}
      child={props.child}
      value={value}
    />
  );
};

export default EditIndustry;
