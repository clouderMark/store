import { IndustryInfoParagraph as InfoParagraphMapping } from '../mapping.js';

const createInfoParagraphs = async (jsonParagraphs, parent) => {
  const paragraphs = JSON.parse(jsonParagraphs);
  for (let paragraph of paragraphs) {
    await InfoParagraphMapping.create({
      value: paragraph.value,
      indInfoId: parent,
    });
  }
};

export default createInfoParagraphs;
