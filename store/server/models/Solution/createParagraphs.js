import { SolutionParagraph as ParagraphMapping } from '../mapping.js';

const createParagraphs = async (jsonParagraphs, parent) => {
  const paragraphs = JSON.parse(jsonParagraphs);
  for (let paragraph of paragraphs) {
    await ParagraphMapping.create({
      value: paragraph.value,
      solutionId: parent,
    });
  }
};

export default createParagraphs;
