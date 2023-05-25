import uuid from 'react-uuid';
import EInfo from './EInfo';
import IDefaultValue from './IDefaultValue';

// eslint-disable-next-line
export const reducer = (state: IDefaultValue, action: {type: EInfo; payload?: any}) => {
  switch (action.type) {
    case EInfo.infoImages: {
      return {
        ...state,
        [EInfo.infoImages]: action.payload,
      };
    }

    case EInfo.infoParagraphs: {
      return {
        ...state,
        [EInfo.infoParagraphs]: action.payload,
      };
    }

    case EInfo.infoTitle: {
      return {
        ...state,
        [EInfo.infoTitle]: action.payload,
      };
    }

    case EInfo.imagesValid: {
      return {
        ...state,
        [EInfo.imagesValid]: action.payload,
      };
    }

    case EInfo.fetch: {
      const data: IDefaultValue = action.payload;

      return {
        ...state,
        [EInfo.infoImages]: data[EInfo.infoImages].map((el) => ({
          ...el,
          image: null,
          imageUrl: el.image ? process.env.REACT_APP_IMG_URL! + el.image : '',
        })),
        [EInfo.infoParagraphs]: data[EInfo.infoParagraphs].map((el) => ({...el, unique: uuid()})),
        [EInfo.infoTitle]: data[EInfo.infoTitle],
        [EInfo.imagesValid]: data[EInfo.infoImages].map((el) => ({valid: true, relateTo: el.relatedTo})),
      };
    }

    case EInfo.reset: {
      return initState(action.payload);
    }

    default:
      throw Error(`Unknown action: ${action.type}`);
  }
};

export const initState = (init: IDefaultValue) => init;
