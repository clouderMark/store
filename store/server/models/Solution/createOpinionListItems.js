import {
  SolutionOpinionItem as OpinionItemMapping,
} from '../mapping.js';

const createOpinionListItems = async (jsonItems, parent) => {
  const listItems = JSON.parse(jsonItems);
  for (let item of listItems) {
    await OpinionItemMapping.create({
      value: item.value,
      solutionOpinionId: parent,
    });
  }
};

export default createOpinionListItems;
