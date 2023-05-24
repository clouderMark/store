import filterParagraphs from '../../filterParagraphs';
import EType from './EType';
import IDefaultValue from './IDefaultValue';

const appendHeaderToData = (appendTo: FormData, value: IDefaultValue) => {
  if (value[EType.headerImage]) {
    appendTo.append(EType.headerImage, value[EType.headerImage], value[EType.headerImage].name);
  }

  appendTo.append(EType.title, value[EType.title].trim());

  if (value[EType.paragraphs].length) {
    const items = filterParagraphs(value[EType.paragraphs]);

    if (items.length) {
      appendTo.append(EType.paragraphs, JSON.stringify(items));
    }
  }
};

export default appendHeaderToData;
