import {EType} from './EType';

interface IDefaultValue {
  [EType.name]: string;
  [EType.valid]: null | boolean;
  [EType.cardImage]: File | null;
  [EType.cardImageUrl]: string;
}

export default IDefaultValue;
