import {EType} from './EType';

export interface IDefaultValue {
  name: string;
  cardImage: File | null;
  cardImageUrl: string;
  headerImage: File | null;
  headerImageUrl: string;
  title: string;
  infoImage: File | null;
  infoImageUrl: string;
  infoTitle: string;
  infoHeader: string;
  infoListTitle: string;
}

// eslint-disable-next-line
export const reducer = (state: IDefaultValue, action: {type: string; payload?: any}) => {
  switch (action.type) {
    case EType.name: {
      return {
        ...state,
        name: action.payload,
      };
    }

    case EType.cardImage: {
      return {
        ...state,
        cardImage: action.payload,
      };
    }

    case EType.cardImageUrl: {
      return {
        ...state,
        cardImageUrl: action.payload,
      };
    }

    case EType.headerImage: {
      return {
        ...state,
        headerImage: action.payload,
      };
    }

    case EType.headerImageUrl: {
      return {
        ...state,
        headerImageUrl: action.payload,
      };
    }

    case EType.title: {
      return {
        ...state,
        title: action.payload,
      };
    }

    case EType.infoImage: {
      return {
        ...state,
        infoImage: action.payload,
      };
    }

    case EType.infoImageUrl: {
      return {
        ...state,
        infoImageUrl: action.payload,
      };
    }

    case EType.infoTitle: {
      return {
        ...state,
        infoTitle: action.payload,
      };
    }

    case EType.infoHeader: {
      return {
        ...state,
        infoHeader: action.payload,
      };
    }

    case EType.infoListTitle: {
      return {
        ...state,
        infoListTitle: action.payload,
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
