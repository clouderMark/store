import {IParagraphs} from '../../types/types';
import {EType} from './EType';

interface IDefaultValue {
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
  [EType.sliderImage]: File | null;
  [EType.sliderImageUrl]: string;
  [EType.valid]: null | boolean;
  [EType.paragraphs]: IParagraphs[];
  [EType.infoListItems]: IParagraphs[];
  [EType.infoParagraphs]: IParagraphs[];
}

export default IDefaultValue;
