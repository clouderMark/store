import {IDefaultValue, IValid} from '../../types/types';

export const isValid = (value: IDefaultValue): IValid => {
  const result = {} as IValid;
  const pattern = /^[0-9.]*$/;

  for (const key in value) {
    if (key) {
      if (key === 'name') result.name = value.name.trim() !== '';
      if (key === 'price') result.price = pattern.test(value.price.trim());
      if (key === 'industry') result.industry = pattern.test(value.industry);
      if (key === 'brand') result.brand = pattern.test(value.brand);
      if (key === 'area') result.area = pattern.test(value.area);
      if (key === 'article') result.article = pattern.test(value.article);
      if (key === 'weight') result.weight = pattern.test(value.weight);
    }
  }

  return result;
};
