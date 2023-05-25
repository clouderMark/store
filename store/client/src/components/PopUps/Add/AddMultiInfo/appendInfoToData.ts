import IDefaultValue from './IDefaultValue';
import EInfo from './EInfo';
import {IImage} from '../../../../types/types';
import filterParagraphs from '../../filterParagraphs';

const appendInfoToData = (appendTo: FormData, value: IDefaultValue) => {
  if (value[EInfo.infoImages].length) {
    value[EInfo.infoImages].forEach((el: IImage) => {
      if (el.image) {
        appendTo.append(EInfo.infoImages, el.image, el.image.name);
        appendTo.append(`${EInfo.infoImages}RelatedTo`, el.relatedTo);
      } else {
        const imageName = el.imageUrl.replace(process.env.REACT_APP_IMG_URL ?? '', '');

        appendTo.append('infoImageUrls', imageName);
      }
    });
  }

  if (value[EInfo.infoParagraphs].length) {
    const items = filterParagraphs(value[EInfo.infoParagraphs]);

    if (items.length) {
      appendTo.append(EInfo.infoParagraphs, JSON.stringify(items));
    }
  }

  if (value[EInfo.infoTitle].length) {
    appendTo.append(EInfo.infoTitle, JSON.stringify(value[EInfo.infoTitle]));
  }
};

export default appendInfoToData;
