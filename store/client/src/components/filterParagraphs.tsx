import {IParagraphs, IFilteredParagraphs} from '../types/types';

const filterParagraphs = (elements: IParagraphs[]): IFilteredParagraphs[] => {
  const items: IFilteredParagraphs[] = elements
    .map((el: IParagraphs) =>
      Object.keys(el)
        .filter((key) => !key.includes('unique'))
        .reduce(
          (obj, key) =>
            Object.assign(obj, {
              [key]: el[key as keyof IFilteredParagraphs],
            }),
          {} as IFilteredParagraphs,
        )).filter((item) => item.value.trim() !== '');

  return items;
};

export default filterParagraphs;
