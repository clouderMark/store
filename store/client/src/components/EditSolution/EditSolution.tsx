import React, {Dispatch, SetStateAction, useEffect, useState, FormEvent, useReducer} from 'react';
import {fetchSolution, createSolution, updateSolution} from '../../http/catalogAPI';
import PopUpForSolution from '../PopUps/PopUpForSolution/PopUpForSolution';
import {IParagraphs} from '../../types/types';
import {initState, reducer} from './reducer';
import {EType} from './EType';
import filterParagraphs from '../PopUps/filterParagraphs';
import {useAppContext} from '../AppContext';
import AddImageWithTextFields from '../PopUps/Add/AddImageWithTextFields/AddImageWithTextFields';
import {
  reducer as imageWithTextFieldsReducer,
  initState as initStateInfo,
} from '../PopUps/Add/AddImageWithTextFields/reducer';
import defaultInfoValue from '../PopUps/Add/AddImageWithTextFields/defaultValue';
import defaultValue from './defaultValue';

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

  const [opinionParagraphs, setOpinionParagraphs] = useState<IParagraphs[]>([]);
  const [opinionListItems, setOpinionListItems] = useState<IParagraphs[]>([]);

  const [value, dispatch] = useReducer(reducer, defaultValue, initState);
  const [infoValue, dispatchInfo] = useReducer(imageWithTextFieldsReducer, defaultInfoValue, initStateInfo);

  useEffect(() => {
    if (id) {
      fetchSolution(id)
        .then((data) => {
          dispatch({type: EType.name, payload: data.name});
          dispatch({type: EType.valid, payload: data.name !== ''});
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  useEffect(() => {
    if (!show) {
      setId(null);
      setOpinionParagraphs([]);
      setOpinionListItems([]);
      dispatch({type: EType.reset, payload: defaultValue});
    }
  }, [show]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const correct = value[EType.name].trim() !== '';

    dispatch({type: EType.valid, payload: correct});
    if (correct) {
      const data = new FormData();

      data.append(EType.name, value[EType.name].trim());
      data.append(EType.opinionTitle, value[EType.opinionTitle].trim());
      data.append(EType.opinionListTitle, value[EType.opinionListTitle].trim());
      data.append(EType.opinionName, value[EType.opinionName].trim());
      data.append(EType.opinionPhone, value[EType.opinionPhone].trim());
      data.append(EType.opinionFax, value[EType.opinionFax].trim());
      data.append(EType.opinionEmail, value[EType.opinionEmail].trim());

      if (opinionParagraphs.length) {
        const items = filterParagraphs(opinionParagraphs);

        if (items.length) {
          data.append(EType.opinionParagraphs, JSON.stringify(items));
        }
      }

      if (opinionListItems.length) {
        const items = filterParagraphs(opinionListItems);

        if (items.length) {
          data.append(EType.opinionListItems, JSON.stringify(items));
        }
      }

      if (value[EType.opinionImage]) {
        data.append(EType.opinionImage, value[EType.opinionImage], value[EType.opinionImage].name);
      }

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
      opinionParagraphs={opinionParagraphs}
      setOpinionParagraphs={setOpinionParagraphs}
      opinionListItems={opinionListItems}
      setOpinionListItems={setOpinionListItems}
      value={value}
      dispatch={dispatch}
      child={[<AddImageWithTextFields value={infoValue} dispatch={dispatchInfo} />]}
    />
  );
};

export default EditSolution;
