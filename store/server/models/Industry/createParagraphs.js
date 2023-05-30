import { IndustryParagraph as IndustryParagraphMapping } from '../mapping.js';

const createParagraphs = async (jsonParagraphs, parent) => {
  const paragraphs = JSON.parse(jsonParagraphs);
  for (let paragraph of paragraphs) {
    await IndustryParagraphMapping.create({
      value: paragraph.value,
      industryId: parent,
    });
  }
};

export default createParagraphs;
