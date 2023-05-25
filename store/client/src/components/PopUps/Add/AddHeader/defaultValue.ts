import EType from './EType';
import IDefaultValue from './IDefaultValue';

const defaultValue: IDefaultValue = {
  [EType.headerImage]: null,
  [EType.headerImageUrl]: '',
  [EType.title]: '',
  [EType.paragraphs]: [],
};

export default defaultValue;
