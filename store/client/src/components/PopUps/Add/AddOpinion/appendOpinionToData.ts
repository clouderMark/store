import filterParagraphs from '../../filterParagraphs';
import EOpinion from './EOpinion';
import IDefaultValue from './IDefaultValue';

const appendOpinionToData = (appendTo: FormData, value: IDefaultValue) => {
  appendTo.append(EOpinion.opinionTitle, value[EOpinion.opinionTitle].trim());
  appendTo.append(EOpinion.opinionListTitle, value[EOpinion.opinionListTitle].trim());
  appendTo.append(EOpinion.opinionName, value[EOpinion.opinionName].trim());
  appendTo.append(EOpinion.opinionPhone, value[EOpinion.opinionPhone].trim());
  appendTo.append(EOpinion.opinionFax, value[EOpinion.opinionFax].trim());
  appendTo.append(EOpinion.opinionEmail, value[EOpinion.opinionEmail].trim());
  if (value[EOpinion.opinionParagraphs].length) {
    const items = filterParagraphs(value[EOpinion.opinionParagraphs]);

    if (items.length) {
      appendTo.append(EOpinion.opinionParagraphs, JSON.stringify(items));
    }
  }

  if (value[EOpinion.opinionListItems].length) {
    const items = filterParagraphs(value[EOpinion.opinionListItems]);

    if (items.length) {
      appendTo.append(EOpinion.opinionListItems, JSON.stringify(items));
    }
  }

  if (value[EOpinion.opinionImage]) {
    appendTo.append(
      EOpinion.opinionImage,
      value[EOpinion.opinionImage],
      value[EOpinion.opinionImage].name,
    );
  }
};

export default appendOpinionToData;
