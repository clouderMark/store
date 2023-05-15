import {EType} from './EType';

interface IDefaultValue {
  [EType.name]: string;
  [EType.cardImage]: File | null;
  [EType.cardImageUrl]: string;
  [EType.headerImage]: File | null;
  [EType.headerImageUrl]: string;
  [EType.title]: string;
  [EType.infoImage]: File | null;
  [EType.infoImageUrl]: string;
  [EType.infoTitle]: string;
  [EType.infoHeader]: string;
  [EType.infoListTitle]: string;
  [EType.opinionTitle]: string;
  [EType.opinionListTitle]: string;
  [EType.opinionName]: string;
  [EType.opinionPhone]: string;
  [EType.opinionFax]: string;
  [EType.opinionEmail]: string;
  [EType.opinionImage]: File | null;
  [EType.opinionImageUrl]: string;
  [EType.sliderImage]: File | null;
  [EType.sliderImageUrl]: string;
  [EType.valid]: null | boolean;
}

export default IDefaultValue;
