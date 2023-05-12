import React, {useEffect, useState, Dispatch, SetStateAction, ChangeEvent, FormEvent, useReducer} from 'react';
import uuid from 'react-uuid';
import PopUpForIndystry from '../PopUps/PopUpForIndustry/PopUpForIndustry';
import {useAppContext} from '../AppContext';
import {IParagraphs, IAreaResponse} from '../../types/types';
import filterParagraphs from '../PopUps/filterParagraphs';
import {reducer, IDefaultValue, initState} from './reducer';
import {EType} from './EType';

interface IProps {
  popUpTitle: string;
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
  [EType.name]: '',
  [EType.cardImage]: null,
  [EType.cardImageUrl]: '',
  [EType.headerImage]: null,
  [EType.headerImageUrl]: '',
  [EType.title]: '',
  [EType.infoImage]: null,
  [EType.infoImageUrl]: '',
  [EType.infoTitle]: '',
  [EType.infoHeader]: '',
  [EType.infoListTitle]: '',
  [EType.opinionTitle]: '',
  [EType.opinionListTitle]: '',
  [EType.opinionName]: '',
  [EType.opinionPhone]: '',
  [EType.opinionFax]: '',
  [EType.opinionEmail]: '',
  [EType.opinionImage]: null,
  [EType.opinionImageUrl]: '',
  [EType.sliderImage]: null,
  [EType.sliderImageUrl]: '',
};

const EditIndustry = (props: IProps) => {
  const {catalog} = useAppContext();
  const {id, show, setShow, setChange, setId} = props;

  const [paragraphs, setParagraphs] = useState<IParagraphs[]>([]);
  const [infoListItems, setInfoListItems] = useState<IParagraphs[]>([]);
  const [infoParagraphs, setInfoParagraphs] = useState<IParagraphs[]>([]);
  const [opinionParagraphs, setOpinionParagraphs] = useState<IParagraphs[]>([]);
  const [opinionListItems, setOpinionListItems] = useState<IParagraphs[]>([]);

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
          dispatch({type: EType.opinionTitle, payload: data.opinion.title});
          dispatch({type: EType.opinionListTitle, payload: data.opinion.listTitle});
          dispatch({type: EType.opinionName, payload: data.opinion.name});
          dispatch({type: EType.opinionPhone, payload: data.opinion.phone});
          dispatch({type: EType.opinionFax, payload: data.opinion.fax});
          dispatch({type: EType.opinionEmail, payload: data.opinion.email});
          dispatch({
            type: EType.opinionImageUrl,
            payload: data.opinion.image ? process.env.REACT_APP_IMG_URL + data.opinion.image : '',
          });
          setInfoListItems(data.info.listItems.map((item) => ({...item, unique: uuid()})));
          setInfoParagraphs(data.info.paragraphs.map((item) => ({...item, unique: uuid()})));
          setOpinionParagraphs(data.opinion.paragraphs.map((item) => ({...item, unique: uuid()})));
          setOpinionListItems(data.opinion.listItems.map((item) => ({...item, unique: uuid()})));
          if (!props.child) {
            dispatch({
              type: EType.sliderImageUrl,
              payload: data.sliderImage ? process.env.REACT_APP_IMG_URL + data.sliderImage : '',
            });
          }
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  // useEffect(() => {
  //   if (value[EType.headerImage]) {
  //     const newImageUrl = URL.createObjectURL(value[EType.headerImage]);

  //     dispatch({type: EType.headerImageUrl, payload: newImageUrl});
  //   }
  // }, [value[EType.headerImage]]);

  // useEffect(() => {
  //   if (value[EType.cardImage]) {
  //     const newImageUrl = URL.createObjectURL(value[EType.cardImage]);

  //     dispatch({type: EType.cardImageUrl, payload: newImageUrl});
  //   }
  // }, [value[EType.cardImage]]);

  // useEffect(() => {
  //   if (value[EType.infoImage]) {
  //     const newImageUrl = URL.createObjectURL(value[EType.infoImage]);

  //     dispatch({type: EType.infoImageUrl, payload: newImageUrl});
  //   }
  // }, [value[EType.infoImage]]);

  // useEffect(() => {
  //   if (value[EType.opinionImage]) {
  //     const newImageUrl = URL.createObjectURL(value[EType.opinionImage]);

  //     dispatch({type: EType.opinionImageUrl, payload: newImageUrl});
  //   }
  // }, [value[EType.opinionImage]]);

  // useEffect(() => {
  //   if (value[EType.sliderImage]) {
  //     const newImageUrl = URL.createObjectURL(value[EType.sliderImage]);

  //     dispatch({type: EType.sliderImageUrl, payload: newImageUrl});
  //   }
  // }, [value[EType.sliderImage]]);

  useEffect(() => {
    if (!show) {
      setId(null);
      dispatch({type: EType.reset, payload: defaultValue});
      setParagraphs([]);
      setInfoListItems([]);
      setInfoParagraphs([]);
      setOpinionParagraphs([]);
      setOpinionListItems([]);
      props.child?.setValue('');
    }
  }, [show]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name} = event.target;
    const {value} = event.target;

    if (name === EType.name) {
      setValid(value.trim() !== '');
    }

    dispatch({type: name, payload: value});
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      const file = event.target.files[0];
      const {name} = event.target;
      const newImageUrl = URL.createObjectURL(file);

      dispatch({type: name, payload: file});
      dispatch({type: `${name}Url`, payload: newImageUrl});
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const correct = value[EType.name].trim() !== '';

    setValid(correct);
    if (correct) {
      const data = new FormData();

      if (props.child) {
        data.append('industryId', props.child.value.trim());
      }

      data.append(EType.name, value[EType.name].trim());
      data.append(EType.title, value[EType.title].trim());
      if (value[EType.cardImage]) {
        data.append(EType.cardImage, value[EType.cardImage], value[EType.cardImage].name);
      }

      if (value[EType.headerImage]) {
        data.append(EType.headerImage, value[EType.headerImage], value[EType.headerImage].name);
      }

      if (paragraphs.length) {
        const items = filterParagraphs(paragraphs);

        if (items.length) {
          data.append('paragraphs', JSON.stringify(items));
        }
      }

      if (value[EType.infoImage]) {
        data.append(EType.infoImage, value[EType.infoImage], value[EType.infoImage].name);
      }

      data.append(EType.infoTitle, value[EType.infoTitle].trim());
      data.append(EType.infoHeader, value[EType.infoHeader].trim());
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

      data.append(EType.opinionTitle, value[EType.opinionTitle].trim());

      if (opinionParagraphs.length) {
        const items = filterParagraphs(opinionParagraphs);

        if (items.length) {
          data.append('opinionParagraphs', JSON.stringify(items));
        }
      }

      data.append(EType.opinionListTitle, value[EType.opinionListTitle].trim());

      if (opinionListItems.length) {
        const items = filterParagraphs(opinionListItems);

        if (items.length) {
          data.append('opinionListItems', JSON.stringify(items));
        }
      }

      data.append(EType.opinionName, value[EType.opinionName].trim());
      data.append(EType.opinionPhone, value[EType.opinionPhone].trim());
      data.append(EType.opinionFax, value[EType.opinionFax].trim());
      data.append(EType.opinionEmail, value[EType.opinionEmail].trim());

      if (value[EType.opinionImage]) {
        data.append(EType.opinionImage, value[EType.opinionImage], value[EType.opinionImage].name);
      }

      if (!props.child && value.sliderImage) {
        data.append(EType.sliderImage, value[EType.sliderImage], value[EType.sliderImage].name);
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
      cardTitle={props.popUpTitle}
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
      opinionParagraphs={opinionParagraphs}
      setOpinionParagraphs={setOpinionParagraphs}
      opinionListItems={opinionListItems}
      setOpinionListItems={setOpinionListItems}
      child={props.child}
      value={value}
    />
  );
};

export default EditIndustry;
