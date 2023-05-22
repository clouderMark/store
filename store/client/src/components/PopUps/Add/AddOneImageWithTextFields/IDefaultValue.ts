import {IParagraphs} from '../../../../types/types';
import EField from './EField';

interface IDefaultValue {
  [EField.infoImage]: File | null;
  [EField.infoImageUrl]: string;
  [EField.infoTitle]: string;
  [EField.infoHeader]: string;
  [EField.infoListTitle]: string;
  [EField.infoListItems]: IParagraphs[];
  [EField.infoParagraphs]: IParagraphs[];
}

export default IDefaultValue;
