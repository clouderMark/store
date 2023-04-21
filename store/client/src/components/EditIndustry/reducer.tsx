import {EType} from './EType';

export interface IDefaultValue {
  [EType.name]: string;
  [EType.cardImage]: File | null;
  [EType.cardImageUrl]: string;
  [EType.headerImage]: File | null;
  [EType.headerImageUrl]: string;
  [EType.title]: string;
  [EType.infoImage]: File | null;
  [EType.infoImageUrl]: string;
  [EType.infoTitle]: string;
  [EType.infoHeader]: string;
  [EType.infoListTitle]: string;
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

    case EType.infoImage: {
      return {
        ...state,
        [EType.infoImage]: action.payload,
      };
    }

    case EType.infoImageUrl: {
      return {
        ...state,
        [EType.infoImageUrl]: action.payload,
      };
    }

    case EType.infoTitle: {
      return {
        ...state,
        [EType.infoTitle]: action.payload,
      };
    }

    case EType.infoHeader: {
      return {
        ...state,
        [EType.infoHeader]: action.payload,
      };
    }

    case EType.infoListTitle: {
      return {
        ...state,
        [EType.infoListTitle]: action.payload,
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

    case EType.reset: {
      return initState(action.payload);
    }

    default:
      throw Error(`Unknown action: ${action.type}`);
  }
};

export const initState = (init: IDefaultValue) => init;
