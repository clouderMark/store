import {
  SolutionOpinionParagraph as OpinionParagraphMapping,
} from '../mapping.js';

const createOpinionParagraphs = async (jsonItems, parent) => {
  const paragraphs = JSON.parse(jsonItems);
  for (let paragraph of paragraphs) {
    await OpinionParagraphMapping.create({
      value: paragraph.value,
      solutionOpinionId: parent,
    });
  }
};

export default createOpinionParagraphs;
