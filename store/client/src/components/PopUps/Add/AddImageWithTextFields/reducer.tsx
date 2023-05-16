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

    case EInfo.reset: {
      return initState(action.payload);
    }

    default:
      throw Error(`Unknown action: ${action.type}`);
  }
};

export const initState = (init: IDefaultValue) => init;
