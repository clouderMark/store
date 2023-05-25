import uuid from 'react-uuid';
import IDefaultValue from './IDefaultValue';
import EField from './EField';
import {IInfo} from '../../../../types/types';

// eslint-disable-next-line
export const reducer = (state: IDefaultValue, action: {type: string; payload?: any}) => {
  switch (action.type) {
    case EField.infoImage: {
      return {
        ...state,
        [EField.infoImage]: action.payload,
      };
    }

    case EField.infoImageUrl: {
      return {
        ...state,
        [EField.infoImageUrl]: action.payload,
      };
    }

    case EField.infoTitle: {
      return {
        ...state,
        [EField.infoTitle]: action.payload,
      };
    }

    case EField.infoHeader: {
      return {
        ...state,
        [EField.infoHeader]: action.payload,
      };
    }

    case EField.infoListTitle: {
      return {
        ...state,
        [EField.infoListTitle]: action.payload,
      };
    }

    case EField.infoListItems: {
      return {
        ...state,
        [EField.infoListItems]: action.payload,
      };
    }

    case EField.infoParagraphs: {
      return {
        ...state,
        [EField.infoParagraphs]: action.payload,
      };
    }

    case EField.fetch: {
      const data: IInfo = action.payload;

      return {
        ...state,
        [EField.infoImageUrl]: data.image ? process.env.REACT_APP_IMG_URL + data.image : '',
        [EField.infoTitle]: data.title,
        [EField.infoHeader]: data.header,
        [EField.infoListTitle]: data.listTitle,
        [EField.infoListItems]: data.listItems.map((item) => ({...item, unique: uuid()})),
        [EField.infoParagraphs]: data.paragraphs.map((item) => ({...item, unique: uuid()})),
      };
    }

    case EField.reset: {
      return initState(action.payload);
    }

    default:
      throw Error(`Unknown action: ${action.type}`);
  }
};

export const initState = (init: IDefaultValue) => init;
