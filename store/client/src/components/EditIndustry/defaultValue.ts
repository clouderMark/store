import {EType} from './EType';
import IDefaultValue from './IDefaultValue';

const defaultValue: IDefaultValue = {
  [EType.name]: '',
  [EType.cardImage]: null,
  [EType.cardImageUrl]: '',
  [EType.headerImage]: null,
  [EType.headerImageUrl]: '',
  [EType.title]: '',
  [EType.infoImage]: null,
  [EType.infoImageUrl]: '',
  [EType.infoTitle]: '',
  [EType.infoHeader]: '',
  [EType.infoListTitle]: '',
  [EType.sliderImage]: null,
  [EType.sliderImageUrl]: '',
  [EType.valid]: null,
  [EType.paragraphs]: [],
  [EType.infoListItems]: [],
  [EType.infoParagraphs]: [],
};

export default defaultValue;
