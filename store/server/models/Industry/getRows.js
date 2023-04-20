import {
  IndustryInfo as InfoMapping,
  IndustryListItem as ListItemMapping,
  IndustryInfoParagraph as InfoParagraphMapping,
  IndustryParagraph as IndustryParagraphMapping,
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
          attributes: ['id', 'value'],
        },
        {
          model: InfoParagraphMapping,
          as: 'paragraphs',
          attributes: ['id', 'value'],
        },
      ],
    },
  ],
  attributes: ['cardImage', 'headerImage', 'title', 'id', 'name'],
};

export const rowsWithParagraphs = {
  include: [
    {
      model: IndustryParagraphMapping,
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
          attributes: ['id', 'value'],
        },
        {
          model: InfoParagraphMapping,
          as: 'paragraphs',
          attributes: ['id', 'value'],
        },
      ],
    },
  ],
  attributes: ['cardImage', 'headerImage', 'title', 'id', 'name'],
};
