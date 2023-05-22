import React, {useEffect, Dispatch, SetStateAction, FormEvent, useReducer} from 'react';
import uuid from 'react-uuid';
import PopUpForIndystry from '../PopUps/PopUpForIndustry/PopUpForIndustry';
import {useAppContext} from '../AppContext';
import {IAreaResponse} from '../../types/types';
import filterParagraphs from '../PopUps/filterParagraphs';
import {reducer, initState} from './reducer';
import {EType} from './EType';
import defaultValue from './defaultValue';

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

const EditIndustry = (props: IProps) => {
  const {catalog} = useAppContext();
  const {id, show, setShow, setChange, setId} = props;

  const [value, dispatch] = useReducer(reducer, defaultValue, initState);

  useEffect(() => {
    if (id) {
      props
        .fetch(id)
        .then((data) => {
          dispatch({type: EType.name, payload: data.name});
          dispatch({type: EType.valid, payload: data.name !== ''});
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
          dispatch({type: EType.paragraphs, payload: data.paragraphs.map((item) => ({...item, unique: uuid()}))});
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
          dispatch({
            type: EType.infoListItems,
            payload: data.info.listItems.map((item) => ({...item, unique: uuid()})),
          });
          dispatch({
            type: EType.infoParagraphs,
            payload: data.info.paragraphs.map((item) => ({...item, unique: uuid()})),
          });
          dispatch({
            type: EType.opinionParagraphs,
            payload: data.opinion.paragraphs.map((item) => ({...item, unique: uuid()})),
          });
          dispatch({
            type: EType.opinionListItems,
            payload: data.opinion.listItems.map((item) => ({...item, unique: uuid()})),
          });
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

  useEffect(() => {
    if (!show) {
      setId(null);
      dispatch({type: EType.reset, payload: defaultValue});
      props.child?.setValue('');
    }
  }, [show]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const correct = value[EType.name].trim() !== '';

    dispatch({type: EType.valid, payload: correct});
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

      if (value[EType.paragraphs].length) {
        const items = filterParagraphs(value[EType.paragraphs]);

        if (items.length) {
          data.append(EType.paragraphs, JSON.stringify(items));
        }
      }

      if (value[EType.infoImage]) {
        data.append(EType.infoImage, value[EType.infoImage], value[EType.infoImage].name);
      }

      data.append(EType.infoTitle, value[EType.infoTitle].trim());
      data.append(EType.infoHeader, value[EType.infoHeader].trim());
      data.append('listTitle', value.infoListTitle.trim());

      if (value[EType.infoListItems].length) {
        const items = filterParagraphs(value[EType.infoListItems]);

        if (items.length) {
          data.append('listItems', JSON.stringify(items));
        }
      }

      if (value[EType.infoParagraphs].length) {
        const items = filterParagraphs(value[EType.infoParagraphs]);

        if (items.length) {
          data.append(EType.infoParagraphs, JSON.stringify(items));
        }
      }

      data.append(EType.opinionTitle, value[EType.opinionTitle].trim());

      if (value[EType.opinionParagraphs].length) {
        const items = filterParagraphs(value[EType.opinionParagraphs]);

        if (items.length) {
          data.append(EType.opinionParagraphs, JSON.stringify(items));
        }
      }

      data.append(EType.opinionListTitle, value[EType.opinionListTitle].trim());

      if (value[EType.opinionListItems].length) {
        const items = filterParagraphs(value[EType.opinionListItems]);

        if (items.length) {
          data.append(EType.opinionListItems, JSON.stringify(items));
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
      handleSubmit={handleSubmit}
      child={props.child}
      value={value}
      dispatch={dispatch}
    />
  );
};

export default EditIndustry;
