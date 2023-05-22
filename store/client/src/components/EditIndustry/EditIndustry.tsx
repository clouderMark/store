import React, {useEffect, Dispatch, SetStateAction, FormEvent, useReducer} from 'react';
import uuid from 'react-uuid';
import PopUpForIndystry from '../PopUps/PopUpForIndustry/PopUpForIndustry';
import {useAppContext} from '../AppContext';
import {IAreaResponse} from '../../types/types';
import filterParagraphs from '../PopUps/filterParagraphs';
import {reducer, initState} from './reducer';
import {EType} from './EType';
import defaultValue from './defaultValue';
import {reducer as opinionReducer, initState as opinionInitState} from '../PopUps/Add/AddOpinion/reducer';
import defaultOpinionValue from '../PopUps/Add/AddOpinion/defaultValue';
import EOpinion from '../PopUps/Add/AddOpinion/EOpinion';
import appendOpinionToData from '../PopUps/Add/AddOpinion/appendOpinionToData';
import {
  reducer as imageWithTextFieldReducer,
  initState as initStateInfo,
} from '../PopUps/Add/AddOneImageWithTextFields/reducer';
import defaultInfoValue from '../PopUps/Add/AddOneImageWithTextFields/defaultValue';
import EField from '../PopUps/Add/AddOneImageWithTextFields/EField';
import appendInfo from '../PopUps/Add/AddOneImageWithTextFields/appendInfo';

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
  const [opinionValue, dispatchOpinion] = useReducer(opinionReducer, defaultOpinionValue, opinionInitState);
  const [infoValue, dispatchInfo] = useReducer(imageWithTextFieldReducer, defaultInfoValue, initStateInfo);

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

          dispatchInfo({type: EField.fetch, payload: data.info});
          dispatchOpinion({type: EOpinion.fetch, payload: data.opinion});
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
      dispatchOpinion({type: EOpinion.reset, payload: defaultOpinionValue});
      dispatchInfo({type: EField.reset, payload: defaultInfoValue});
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

      appendOpinionToData(data, opinionValue);
      appendInfo(data, infoValue);

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
      opinionValue={opinionValue}
      dispatchOpinion={dispatchOpinion}
      infoValue={infoValue}
      dispatchInfo={dispatchInfo}
    />
  );
};

export default EditIndustry;
