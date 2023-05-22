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

    case EType.title: {
      return {
        ...state,
        [EType.title]: action.payload,
      };
    }

    case EType.sliderImage: {
      return {
        ...state,
        [EType.sliderImage]: action.payload,
      };
    }

    case EType.sliderImageUrl: {
      return {
        ...state,
        [EType.sliderImageUrl]: action.payload,
      };
    }

    case EType.valid: {
      return {
        ...state,
        [EType.valid]: action.payload,
      };
    }

    case EType.paragraphs: {
      return {
        ...state,
        [EType.paragraphs]: action.payload,
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
