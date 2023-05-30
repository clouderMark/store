import { SubIndustryParagraph as SubIndustryParagraphMapping } from '../mapping.js';

const createParagraphs = async (jsonParagraphs, parent) => {
  const paragraphs = JSON.parse(jsonParagraphs);
  for (let paragraph of paragraphs) {
    await SubIndustryParagraphMapping.create({
      value: paragraph.value,
      subindustryId: parent,
    });
  }
};

export default createParagraphs;
