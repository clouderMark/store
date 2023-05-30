import {
  IndustryInfo as InfoMapping,
  IndustryListItem as ListItemMapping,
  IndustryInfoParagraph as InfoParagraphMapping,
  IndustryParagraph as IndustryParagraphMapping,
  IndustryOpinion as OpinionMapping,
  IndustryOpinionParagraph as OpinionParagraphMapping,
  IndustryOpinionItem as OpinionItemMapping,
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
    {
      model: OpinionMapping,
      as: 'opinion',
      attributes: ['id', 'title', 'name', 'image', 'listTitle', 'phone', 'fax', 'email'],
      include: [
        {
          model: OpinionParagraphMapping,
          as: 'paragraphs',
          attributes: ['id', 'value'],
        },
        {
          model: OpinionItemMapping,
          as: 'listItems',
          attributes: ['id', 'value'],
        },
      ],
    },
  ],
  attributes: ['cardImage', 'headerImage', 'title', 'id', 'name', 'sliderImage'],
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
    {
      model: OpinionMapping,
      as: 'opinion',
      attributes: ['id', 'title', 'name', 'image', 'listTitle', 'phone', 'fax', 'email'],
      include: [
        {
          model: OpinionParagraphMapping,
          as: 'paragraphs',
          attributes: ['id', 'value'],
        },
        {
          model: OpinionItemMapping,
          as: 'listItems',
          attributes: ['id', 'value'],
        },
      ],
    },
  ],
  attributes: ['cardImage', 'headerImage', 'title', 'id', 'name', 'sliderImage'],
};
