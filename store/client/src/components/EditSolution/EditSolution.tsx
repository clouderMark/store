import React, {Dispatch, SetStateAction, useEffect, FormEvent, useReducer} from 'react';
import uuid from 'react-uuid';
import {fetchSolution, createSolution, updateSolution} from '../../http/catalogAPI';
import PopUpForSolution from '../PopUps/PopUpForSolution/PopUpForSolution';
import {initState, reducer} from './reducer';
import {EType} from './EType';
import {useAppContext} from '../AppContext';
import AddImageWithTextFields from '../PopUps/Add/AddImageWithTextFields/AddImageWithTextFields';
import {
  reducer as imageWithTextFieldsReducer,
  initState as initStateInfo,
} from '../PopUps/Add/AddImageWithTextFields/reducer';
import defaultInfoValue from '../PopUps/Add/AddImageWithTextFields/defaultValue';
import defaultValue from './defaultValue';
import EInfo from '../PopUps/Add/AddImageWithTextFields/EInfo';
import {reducer as opinionReducer, initState as opinionInitState} from '../PopUps/Add/AddOpinion/reducer';
import defaultOpinionValue from '../PopUps/Add/AddOpinion/defaultValue';
import EOpinion from '../PopUps/Add/AddOpinion/EOpinion';
import appendOpinionToData from '../PopUps/Add/AddOpinion/appendOpinionToData';
import appendInfoToData from '../PopUps/Add/AddImageWithTextFields/appendInfoToData';

interface IProps {
  id: number | null;
  setId: Dispatch<SetStateAction<number | null>>;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setChange: Dispatch<SetStateAction<boolean>>;
}

const EditSolution = (props: IProps) => {
  const {catalog} = useAppContext();
  const {id, show, setShow, setChange, setId} = props;

  const [value, dispatch] = useReducer(reducer, defaultValue, initState);
  const [infoValue, dispatchInfo] = useReducer(imageWithTextFieldsReducer, defaultInfoValue, initStateInfo);
  const [opinionValue, dispatchOpinion] = useReducer(opinionReducer, defaultOpinionValue, opinionInitState);

  useEffect(() => {
    if (id) {
      fetchSolution(id)
        .then((data) => {
          console.log(data);
          dispatch({type: EType.fetch, payload: data});
          dispatchInfo({
            type: EInfo.infoImages,
            payload: data.infoImages.map((el) => ({
              ...el,
              image: null,
              imageUrl: el.image ? process.env.REACT_APP_IMG_URL! + el.image : '',
            })),
          });
          dispatchInfo({
            type: EInfo.infoParagraphs,
            payload: data.infoParagraphs.map((el) => ({...el, unique: uuid()})),
          });
          dispatchInfo({
            type: EInfo.infoTitle,
            payload: data.infoTitle,
          });
          dispatchOpinion({
            type: EOpinion.fetch,
            payload: data.opinion,
          });
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  useEffect(() => {
    if (!show) {
      setId(null);
      dispatch({type: EType.reset, payload: defaultValue});
      dispatchInfo({type: EInfo.reset, payload: defaultInfoValue});
      dispatchOpinion({type: EOpinion.reset, payload: defaultOpinionValue});
    }
  }, [show]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const correct = value[EType.name].trim() !== '';

    dispatch({type: EType.valid, payload: correct});
    if (correct) {
      const data = new FormData();

      data.append(EType.name, value[EType.name].trim());
      if (value[EType.cardImage]) {
        data.append(
          EType.cardImage,
          value[EType.cardImage],
          value[EType.cardImage].name,
        );
      }

      appendOpinionToData(data, opinionValue);
      appendInfoToData(data, infoValue);

      const success = () => {
        // закрываю окно создания редактирования решения
        setShow(false);
        // измения состояние родителя, чтобы обновить список решений
        setChange((state) => !state);
      };

      if (id) {
        updateSolution(id, data)
          .then((data) => {
            success();
            catalog.solutions = [...catalog.solutions.filter((el) => el.id !== data.id), data];
          })
          .catch((error) => console.error(error));
      } else {
        createSolution(data)
          .then((data) => {
            success();
            catalog.solutions = [...catalog.solutions, data];
          })
          .catch((error) => console.error(error));
      }
    }
  };

  return (
    <PopUpForSolution
      show={show}
      setShow={setShow}
      id={id}
      handleSubmit={handleSubmit}
      value={value}
      dispatch={dispatch}
      opinionValue={opinionValue}
      dispatchOpinion={dispatchOpinion}
      child={[<AddImageWithTextFields value={infoValue} dispatch={dispatchInfo} />]}
    />
  );
};

export default EditSolution;
