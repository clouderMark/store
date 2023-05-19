import { SolutionInfoTitle as SolutionInfoTitleMapping } from '../mapping.js';

const createTitle = async (jsonTitle, parent) => {
  const titles = JSON.parse(jsonTitle);
  for (let title of titles) {
    await SolutionInfoTitleMapping.create({
      value: title.value,
      unique: title.unique,
      solutionId: parent,
    });
  }
};

export default createTitle;
