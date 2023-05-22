import {EType} from './EType';
import IDefaultValue from './IDefaultValue';

const defaultValue: IDefaultValue = {
  [EType.name]: '',
  [EType.cardImage]: null,
  [EType.cardImageUrl]: '',
  [EType.headerImage]: null,
  [EType.headerImageUrl]: '',
  [EType.title]: '',
  [EType.sliderImage]: null,
  [EType.sliderImageUrl]: '',
  [EType.valid]: null,
  [EType.paragraphs]: [],
};

export default defaultValue;
