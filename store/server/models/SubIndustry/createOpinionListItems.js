import { SubOpinionItem as OpinionItemMapping } from '../mapping.js';

const createOpinionListItems = async (jsonListItems, parent) => {
  const listItems = JSON.parse(jsonListItems);
  for (let item of listItems) {
    await OpinionItemMapping.create({
      value: item.value,
      subOpinionId: parent,
    });
  }
};

export default createOpinionListItems;
