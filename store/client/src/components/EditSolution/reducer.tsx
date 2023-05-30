import {EType} from './EType';
import IDefaultValue from './IDefaultValue';

// eslint-disable-next-line
export const reducer = (state: IDefaultValue, action: {type: string; payload?: any}) => {
  switch (action.type) {
    case EType.name: {
      return {
        ...state,
        [EType.name]: action.payload,
      };
    }

    case EType.cardImage: {
      return {
        ...state,
        [EType.cardImage]: action.payload,
      };
    }

    case EType.cardImageUrl: {
      return {
        ...state,
        [EType.cardImageUrl]: action.payload,
      };
    }

    case EType.valid: {
      return {
        ...state,
        [EType.valid]: action.payload,
      };
    }

    case EType.fetch: {
      const data = action.payload;

      return {
        ...state,
        [EType.name]: data.name,
        [EType.valid]: data.name !== '',
        [EType.cardImageUrl]: data.cardImage ? process.env.REACT_APP_IMG_URL + data.cardImage : '',
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
