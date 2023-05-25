import { SolutionInfoParagraph as SolutionInfoParagraphMapping } from '../mapping.js';

const createInfoParagraphs = async (jsonParagraphs, parent) => {
  const paragraphs = JSON.parse(jsonParagraphs);
  for (let paragraph of paragraphs) {
    await SolutionInfoParagraphMapping.create({
      value: paragraph.value,
      relatedTo: paragraph.relatedTo,
      solutionId: parent,
    });
  }
};

export default createInfoParagraphs;
