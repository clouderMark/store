import {EType} from './EType';
import IDefaultValue from './IDefaultValue';

const defaultValue: IDefaultValue = {
  [EType.name]: '',
  [EType.opinionTitle]: '',
  [EType.opinionListTitle]: '',
  [EType.opinionName]: '',
  [EType.opinionPhone]: '',
  [EType.opinionFax]: '',
  [EType.opinionEmail]: '',
  [EType.opinionImage]: null,
  [EType.opinionImageUrl]: '',
  [EType.opinionParagraphs]: [],
  [EType.opinionListItems]: [],
};

export default defaultValue;
