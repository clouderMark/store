import {
  SolutionInfoImage as SolutionInfoImageMapping,
  SolutionInfoParagraph as SolutionInfoParagraphMapping,
  SolutionInfoTitle as SolutionInfoTitleMapping,
  SolutionOpinion as OpinionMapping,
  SolutionOpinionItem as OpinionItemMapping,
  SolutionOpinionParagraph as OpinionParagraphMapping,
  SolutionParagraph as ParagraphMapping,
} from '../mapping.js';

export const include = {
  include: [
    {
      model: ParagraphMapping,
      as: 'paragraphs',
      attributes: ['id', 'value'],
    },
    {
      model: SolutionInfoImageMapping,
      as: 'infoImages',
      attributes: ['id', 'image', 'relatedTo'],
    },
    {
      model: SolutionInfoParagraphMapping,
      as: 'infoParagraphs',
      attributes: ['id', 'relatedTo', 'value'],
    },
    {
      model: SolutionInfoTitleMapping,
      as: 'infoTitle',
      attributes: ['id', 'unique', 'value'],
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
  ]
}