import {ICells} from './types';
import {cells} from './cells';

export const getFilteredCells = (key: string): ICells[] => {
  if (key === 'solution' || key === 'industry' || key === 'area') {
    return cells.filter((_, i) => i === 0 || i === 7 || i === 8);
  }

  return cells;
};
