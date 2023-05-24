import uuid from 'react-uuid';
import EType from './EType';
import IDefaultValue from './IDefaultValue';

// eslint-disable-next-line
export const reducer = (state: IDefaultValue, action: {type: string; payload?: any}) => {
  switch (action.type) {
    case EType.title: {
      return {
        ...state,
        [EType.title]: action.payload,
      };
    }

    case EType.paragraphs: {
      return {
        ...state,
        [EType.paragraphs]: action.payload,
      };
    }

    case EType.headerImage: {
      return {
        ...state,
        [EType.headerImage]: action.payload,
      };
    }

    case EType.headerImageUrl: {
      return {
        ...state,
        [EType.headerImageUrl]: action.payload,
      };
    }

    case EType.fetch: {
      const data: IDefaultValue = action.payload;

      return {
        ...state,
        [EType.headerImageUrl]: data[EType.headerImage] ? process.env.REACT_APP_IMG_URL! + data[EType.headerImage] : '',
        [EType.title]: data[EType.title],
        [EType.paragraphs]: data.paragraphs.map((item) => ({...item, unique: uuid()})),
      };
    }

    case EType.reset: {
      return initState(action.payload);
    }

    default:
      throw Error(`Unknown action: ${action.type}`);
  }
};

export const initState = (init: IDefaultValue) => init;
