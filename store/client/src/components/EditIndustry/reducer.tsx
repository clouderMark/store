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

    case EType.infoListItems: {
      return {
        ...state,
        [EType.infoListItems]: action.payload,
      };
    }

    case EType.infoParagraphs: {
      return {
        ...state,
        [EType.infoParagraphs]: action.payload,
      };
    }

    case EType.opinionParagraphs: {
      return {
        ...state,
        [EType.opinionParagraphs]: action.payload,
      };
    }

    case EType.opinionListItems: {
      return {
        ...state,
        [EType.opinionListItems]: action.payload,
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
