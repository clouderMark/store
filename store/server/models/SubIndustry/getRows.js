import {
  SubInfo as InfoMapping,
  SubListItem as ListItemMapping,
  SubInfoParagraph as InfoParagraphMapping,
  SubIndustryParagraph as SubIndustryParagraphMapping,
  SubOpinion as OpinionMapping,
  SubOpinionParagraph as OpinionParagraphMapping,
  SubOpinionItem as OpinionItemMapping,
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
  attributes: ['cardImage', 'headerImage', 'title', 'industryId', 'id', 'name'],
};
