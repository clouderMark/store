import {IParagraphs} from '../../types/types';
import {EType} from './EType';

interface IDefaultValue {
  [EType.name]: string;
  [EType.opinionTitle]: string;
  [EType.opinionListTitle]: string;
  [EType.opinionName]: string;
  [EType.opinionPhone]: string;
  [EType.opinionFax]: string;
  [EType.opinionEmail]: string;
  [EType.opinionImage]: File | null;
  [EType.opinionImageUrl]: string;
  [EType.opinionParagraphs]: IParagraphs[];
  [EType.opinionListItems]: IParagraphs[];
}

export default IDefaultValue;
