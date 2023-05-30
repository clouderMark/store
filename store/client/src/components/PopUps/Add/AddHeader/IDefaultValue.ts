import {IParagraphs} from '../../../../types/types';
import EType from './EType';

interface IDefaultValue {
  [EType.headerImage]: File | null;
  [EType.headerImageUrl]: string;
  [EType.title]: string;
  [EType.paragraphs]: IParagraphs[];
}

export default IDefaultValue;
