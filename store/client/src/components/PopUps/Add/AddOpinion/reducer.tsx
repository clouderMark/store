import EOpinion from './EOpinion';
import IDefaultValue from './IDefaultValue';

// eslint-disable-next-line
export const reducer = (state: IDefaultValue, action: {type: string; payload?: any}) => {
  switch (action.type) {
    case EOpinion.opinionTitle: {
      return {
        ...state,
        [EOpinion.opinionTitle]: action.payload,
      };
    }

    case EOpinion.opinionListTitle: {
      return {
        ...state,
        [EOpinion.opinionListTitle]: action.payload,
      };
    }

    case EOpinion.opinionName: {
      return {
        ...state,
        [EOpinion.opinionName]: action.payload,
      };
    }

    case EOpinion.opinionPhone: {
      return {
        ...state,
        [EOpinion.opinionPhone]: action.payload,
      };
    }

    case EOpinion.opinionFax: {
      return {
        ...state,
        [EOpinion.opinionFax]: action.payload,
      };
    }

    case EOpinion.opinionEmail: {
      return {
        ...state,
        [EOpinion.opinionEmail]: action.payload,
      };
    }

    case EOpinion.opinionImage: {
      return {
        ...state,
        [EOpinion.opinionImage]: action.payload,
      };
    }

    case EOpinion.opinionImageUrl: {
      return {
        ...state,
        [EOpinion.opinionImageUrl]: action.payload,
      };
    }

    case EOpinion.opinionParagraphs: {
      return {
        ...state,
        [EOpinion.opinionParagraphs]: action.payload,
      };
    }

    case EOpinion.opinionListItems: {
      return {
        ...state,
        [EOpinion.opinionListItems]: action.payload,
      };
    }

    case EOpinion.reset: {
      return initState(action.payload);
    }

    default:
      throw Error(`Unknown Opinion action: ${action.type}`);
  }
};

export const initState = (init: IDefaultValue) => init;
