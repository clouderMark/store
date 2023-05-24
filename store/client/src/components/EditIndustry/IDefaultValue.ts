import {EType} from './EType';

interface IDefaultValue {
  [EType.name]: string;
  [EType.cardImage]: File | null;
  [EType.cardImageUrl]: string;
  [EType.sliderImage]: File | null;
  [EType.sliderImageUrl]: string;
  [EType.valid]: null | boolean;
}

export default IDefaultValue;
