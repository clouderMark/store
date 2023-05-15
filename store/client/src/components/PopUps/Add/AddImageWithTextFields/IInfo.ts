import {IImage, IParagraphsRelatedTo, ITitleRelatedTo} from '../../../../types/types';
import EInfo from './EInfo';

interface IInfo {
  [EInfo.infoImages]: IImage[];
  [EInfo.infoParagraphs]: IParagraphsRelatedTo[];
  [EInfo.infoTitle]: ITitleRelatedTo[];
}

export default IInfo;
