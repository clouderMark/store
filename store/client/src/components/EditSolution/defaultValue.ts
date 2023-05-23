import {EType} from './EType';
import IDefaultValue from './IDefaultValue';

const defaultValue: IDefaultValue = {
  [EType.name]: '',
  [EType.valid]: null,
  [EType.cardImage]: null,
  [EType.cardImageUrl]: '',
  [EType.headerImage]: null,
  [EType.headerImageUrl]: '',
};

export default defaultValue;
