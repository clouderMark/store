import {
  SubInfo as InfoMapping,
  SubListItem as ListItemMapping,
  SubInfoParagraph as InfoParagraphMapping,
  SubIndustryParagraph as SubIndustryParagraphMapping,
} from '../mapping.js';

export const rows = {
  include: [
    {
      model: InfoMapping,
      as: 'info',
      attributes: ['id', 'image', 'listTitle', 'title', 'header'],
      include: [
        {
          model: ListItemMapping,
          as: 'listItems',
          attributes: ['id', 'item'],
        },
        {
          model: InfoParagraphMapping,
          as: 'paragraphs',
          attributes: ['id', 'value'],
        },
      ],
    },
  ],
  attributes: ['cardImage', 'headerImage', 'title', 'industryId', 'id', 'name'],
};

export const rowsWithParagraphs = {
  include: [
    {
      model: SubIndustryParagraphMapping,
      as: 'paragraphs',
      attributes: ['id', 'value'],
    },
    {
      model: InfoMapping,
      as: 'info',
      attributes: ['id', 'image', 'listTitle', 'title', 'header'],
      include: [
        {
          model: ListItemMapping,
          as: 'listItems',
          attributes: ['id', 'item'],
        },
        {
          model: InfoParagraphMapping,
          as: 'paragraphs',
          attributes: ['id', 'value'],
        },
      ],
    },
  ],
  attributes: ['cardImage', 'headerImage', 'title', 'industryId', 'id', 'name'],
};
