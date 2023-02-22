import {ICells} from './types';
import {cells} from './cells';

export const getFilteredCells = (key: string): ICells[] => {
  if (key === 'brand' || key === 'category') {
    return cells.filter((_, i) => i === 0 || i === 4 || i === 5);
  }

  return cells;
};
