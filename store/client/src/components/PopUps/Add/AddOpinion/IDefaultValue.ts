import {IParagraphs} from '../../../../types/types';
import EOpinion from './EOpinion';

interface IDefaultValue {
  [EOpinion.opinionTitle]: string;
  [EOpinion.opinionListTitle]: string;
  [EOpinion.opinionName]: string;
  [EOpinion.opinionPhone]: string;
  [EOpinion.opinionFax]: string;
  [EOpinion.opinionEmail]: string;
  [EOpinion.opinionImage]: File | null;
  [EOpinion.opinionImageUrl]: string;
  [EOpinion.opinionParagraphs]: IParagraphs[];
  [EOpinion.opinionListItems]: IParagraphs[];
}

export default IDefaultValue;
