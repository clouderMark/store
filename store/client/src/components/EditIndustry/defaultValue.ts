import {EType} from './EType';
import IDefaultValue from './IDefaultValue';

const defaultValue: IDefaultValue = {
  [EType.name]: '',
  [EType.cardImage]: null,
  [EType.cardImageUrl]: '',
  [EType.sliderImage]: null,
  [EType.sliderImageUrl]: '',
  [EType.valid]: null,
};

export default defaultValue;
