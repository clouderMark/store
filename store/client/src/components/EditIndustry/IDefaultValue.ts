import {IParagraphs} from '../../types/types';
import {EType} from './EType';

interface IDefaultValue {
  [EType.name]: string;
  [EType.cardImage]: File | null;
  [EType.cardImageUrl]: string;
  [EType.headerImage]: File | null;
  [EType.headerImageUrl]: string;
  [EType.title]: string;
  [EType.sliderImage]: File | null;
  [EType.sliderImageUrl]: string;
  [EType.valid]: null | boolean;
  [EType.paragraphs]: IParagraphs[];
}

export default IDefaultValue;
