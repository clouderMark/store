import {ICells} from './types';
import {cells} from './cells';

export const getFilteredCells = (key: string): ICells[] => {
  if (key === 'brand' || key === 'category' || key === 'area') {
    return cells.filter((_, i) => i === 0 || i === 5 || i === 6);
  }

  return cells;
};
