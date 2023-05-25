import React, {Dispatch, SetStateAction, useEffect, FormEvent, useReducer} from 'react';
import {fetchSolution, createSolution, updateSolution} from '../../http/catalogAPI';
import PopUpForSolution from '../PopUps/PopUpForSolution/PopUpForSolution';
import {initState, reducer} from './reducer';
import {EType} from './EType';
import {useAppContext} from '../AppContext';
import AddMultiInfo from '../PopUps/Add/AddMultiInfo/AddMultiInfo';
import {
  reducer as imageWithTextFieldsReducer,
  initState as initStateInfo,
} from '../PopUps/Add/AddMultiInfo/reducer';
import defaultInfoValue from '../PopUps/Add/AddMultiInfo/defaultValue';
import defaultValue from './defaultValue';
import EInfo from '../PopUps/Add/AddMultiInfo/EInfo';
import {reducer as opinionReducer, initState as opinionInitState} from '../PopUps/Add/AddOpinion/reducer';
import defaultOpinionValue from '../PopUps/Add/AddOpinion/defaultValue';
import EOpinion from '../PopUps/Add/AddOpinion/EOpinion';
import appendOpinionToData from '../PopUps/Add/AddOpinion/appendOpinionToData';
import appendInfoToData from '../PopUps/Add/AddMultiInfo/appendInfoToData';
import {reducer as headerReducer, initState as headerInitState} from '../PopUps/Add/AddHeader/reducer';
import defaultHeaderValue from '../PopUps/Add/AddHeader/defaultValue';
import EHeader from '../PopUps/Add/AddHeader/EType';
import appendHeaderToData from '../PopUps/Add/AddHeader/appendHeaderToData';

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
  const [headerValue, dispatchHeader] = useReducer(headerReducer, defaultHeaderValue, headerInitState);
  const [infoValue, dispatchInfo] = useReducer(imageWithTextFieldsReducer, defaultInfoValue, initStateInfo);
  const [opinionValue, dispatchOpinion] = useReducer(opinionReducer, defaultOpinionValue, opinionInitState);

  useEffect(() => {
    if (id) {
      fetchSolution(id)
        .then((data) => {
          dispatch({type: EType.fetch, payload: data});
          dispatchHeader({type: EHeader.fetch, payload: data});
          dispatchInfo({type: EInfo.fetch, payload: data});
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
      dispatchHeader({type: EHeader.reset, payload: defaultHeaderValue});
      dispatchInfo({type: EInfo.reset, payload: defaultInfoValue});
      dispatchOpinion({type: EOpinion.reset, payload: defaultOpinionValue});
    }
  }, [show]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const correct = value[EType.name].trim() !== '';

    dispatch({type: EType.valid, payload: correct});
    dispatchInfo({
      type: EInfo.imagesValid,
      payload: infoValue[EInfo.imagesValid].map((el: any) => (!el.valid ? {...el, valid: false} : el)), // eslint-disable-line
    });
    // eslint-disable-next-line
    if (correct && infoValue[EInfo.imagesValid].every((el: any) => el.valid)) {
      const data = new FormData();

      data.append(EType.name, value[EType.name].trim());
      if (value[EType.cardImage]) {
        data.append(EType.cardImage, value[EType.cardImage], value[EType.cardImage].name);
      }

      appendHeaderToData(data, headerValue);
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
      headerValue={headerValue}
      dispatchHeader={dispatchHeader}
      opinionValue={opinionValue}
      dispatchOpinion={dispatchOpinion}
      child={[<AddMultiInfo value={infoValue} dispatch={dispatchInfo} />]}
    />
  );
};

export default EditSolution;
