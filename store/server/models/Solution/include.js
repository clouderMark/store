import {
  SolutionInfoImage as SolutionInfoImageMapping,
  SolutionInfoParagraph as SolutionInfoParagraphMapping,
  SolutionInfoTitle as SolutionInfoTitleMapping,
} from '../mapping.js';

export const include = {
  include: [
    {
      model: SolutionInfoImageMapping,
      as: 'infoImages',
      attributes: ['id', 'image', 'unique'],
    },
    {
      model: SolutionInfoParagraphMapping,
      as: 'infoParagraphs',
      attributes: ['id', 'relatedTo', 'value'],
    },
    {
      model: SolutionInfoTitleMapping,
      as: 'infoTitle',
      attributes: ['id', 'relatedTo', 'value'],
    },
  ]
}