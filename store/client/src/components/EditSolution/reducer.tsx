import {EType} from './EType';

export interface IDefaultValue {
  [EType.name]: string;
  [EType.opinionTitle]: string;
  [EType.opinionListTitle]: string;
  [EType.opinionName]: string;
  [EType.opinionPhone]: string;
  [EType.opinionFax]: string;
  [EType.opinionEmail]: string;
  [EType.opinionImage]: File | null;
  [EType.opinionImageUrl]: string;
}

// eslint-disable-next-line
export const reducer = (state: IDefaultValue, action: {type: string; payload?: any}) => {
  switch (action.type) {
    case EType.name: {
      return {
        ...state,
        [EType.name]: action.payload,
      };
    }

    case EType.opinionTitle: {
      return {
        ...state,
        [EType.opinionTitle]: action.payload,
      };
    }

    case EType.opinionListTitle: {
      return {
        ...state,
        [EType.opinionListTitle]: action.payload,
      };
    }

    case EType.opinionImage: {
      return {
        ...state,
        [EType.opinionImage]: action.payload,
      };
    }

    case EType.opinionImageUrl: {
      return {
        ...state,
        [EType.opinionImageUrl]: action.payload,
      };
    }

    case EType.opinionName: {
      return {
        ...state,
        [EType.opinionName]: action.payload,
      };
    }

    case EType.opinionPhone: {
      return {
        ...state,
        [EType.opinionPhone]: action.payload,
      };
    }

    case EType.opinionFax: {
      return {
        ...state,
        [EType.opinionFax]: action.payload,
      };
    }

    case EType.opinionEmail: {
      return {
        ...state,
        [EType.opinionEmail]: action.payload,
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
