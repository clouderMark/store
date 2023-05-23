import {EType} from './EType';

interface IDefaultValue {
  [EType.name]: string;
  [EType.valid]: null | boolean;
  [EType.cardImage]: File | null;
  [EType.cardImageUrl]: string;
  [EType.headerImage]: File | null;
  [EType.headerImageUrl]: string;
}

export default IDefaultValue;
