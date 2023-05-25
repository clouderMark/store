import IDefaultValue from './IDefaultValue';
import EField from './EField';
import filterParagraphs from '../../filterParagraphs';

const appendInfo = (appendTo: FormData, value: IDefaultValue) => {
  if (value[EField.infoImage]) {
    appendTo.append(EField.infoImage, value[EField.infoImage], value[EField.infoImage].name);
  }

  appendTo.append(EField.infoTitle, value[EField.infoTitle].trim());
  appendTo.append(EField.infoHeader, value[EField.infoHeader].trim());
  appendTo.append('listTitle', value[EField.infoHeader].trim());
  if (value[EField.infoListItems].length) {
    const items = filterParagraphs(value[EField.infoListItems]);

    if (items.length) {
      appendTo.append('listItems', JSON.stringify(items));
    }
  }

  if (value[EField.infoParagraphs].length) {
    const items = filterParagraphs(value[EField.infoParagraphs]);

    if (items.length) {
      appendTo.append(EField.infoParagraphs, JSON.stringify(items));
    }
  }
};

export default appendInfo;
