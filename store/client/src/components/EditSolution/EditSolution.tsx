import React, {Dispatch, SetStateAction, useEffect, useState, ChangeEvent, FormEvent, useReducer} from 'react';
import {fetchSolution, createSolution, updateSolution} from '../../http/catalogAPI';
import PopUpForSolutiond from '../PopUps/PopUpForSolution/PopUpForSolution';
import {IParagraphs} from '../../types/types';
import {IDefaultValue, initState, reducer} from './reducer';
import {EType} from './EType';
import filterParagraphs from '../PopUps/filterParagraphs';
import {useAppContext} from '../AppContext';

interface IProps {
  id: number | null;
  setId: Dispatch<SetStateAction<number | null>>;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setChange: Dispatch<SetStateAction<boolean>>;
}

const defaultValue: IDefaultValue = {
  [EType.name]: '',
  [EType.opinionTitle]: '',
  [EType.opinionListTitle]: '',
  [EType.opinionName]: '',
  [EType.opinionPhone]: '',
  [EType.opinionFax]: '',
  [EType.opinionEmail]: '',
  [EType.opinionImage]: null,
  [EType.opinionImageUrl]: '',
};

const EditSolution = (props: IProps) => {
  const {catalog} = useAppContext();
  const {id, show, setShow, setChange, setId} = props;
  const [valid, setValid] = useState<null | boolean>(null);

  const [opinionParagraphs, setOpinionParagraphs] = useState<IParagraphs[]>([]);
  const [opinionListItems, setOpinionListItems] = useState<IParagraphs[]>([]);

  const [value, dispatch] = useReducer(reducer, defaultValue, initState);

  useEffect(() => {
    if (id) {
      fetchSolution(id)
        .then((data) => {
          dispatch({type: EType.name, payload: data.name});
          setValid(data.name !== '');
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

  useEffect(() => {
    if (value[EType.opinionImage]) {
      const newImageUrl = URL.createObjectURL(value[EType.opinionImage]);

      dispatch({type: EType.opinionImageUrl, payload: newImageUrl});
    }
  }, [value[EType.opinionImage]]);

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
      const inputName = event.target.name;

      dispatch({type: inputName, payload: file});
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const correct = value[EType.name].trim() !== '';

    setValid(correct);
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
          data.append('opinionParagraphs', JSON.stringify(items));
        }
      }

      if (opinionListItems.length) {
        const items = filterParagraphs(opinionListItems);

        if (items.length) {
          data.append('opinionListItems', JSON.stringify(items));
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
    <PopUpForSolutiond
      show={show}
      setShow={setShow}
      id={id}
      handleImageChange={handleImageChange}
      valid={valid}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      opinionParagraphs={opinionParagraphs}
      setOpinionParagraphs={setOpinionParagraphs}
      opinionListItems={opinionListItems}
      setOpinionListItems={setOpinionListItems}
      value={value}
    />
  );
};

export default EditSolution;
