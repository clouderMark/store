import {EType} from './EType';

interface IDefaultValue {
  [EType.name]: string;
  [EType.valid]: null | boolean;
}

export default IDefaultValue;
