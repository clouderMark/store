import { IndustryOpinionParagraph as OpinionParagraphMapping } from '../mapping.js';

const createOpinionParagraphs = async (jsonParagraphs, parent) => {
  const paragraphs = JSON.parse(jsonParagraphs);
  for (let paragraph of paragraphs) {
    await OpinionParagraphMapping.create({
      value: paragraph.value,
      indOpinionId: parent,
    });
  }
};

export default createOpinionParagraphs;
