import {IImage, IParagraphsRelatedTo, IParagraphs} from '../../../../types/types';
import EInfo from './EInfo';

interface IDefaultValue {
  [EInfo.infoImages]: IImage[];
  [EInfo.infoParagraphs]: IParagraphsRelatedTo[];
  [EInfo.infoTitle]: IParagraphs[];
  [EInfo.imagesValid]: {
    valid: null | boolean;
    relatedTo: string;
  }[];
}

export default IDefaultValue;
