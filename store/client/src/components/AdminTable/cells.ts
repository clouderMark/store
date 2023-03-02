import {ICells} from './types';

export const cells: ICells[] = [
  {
    field: 'name',
    headerName: 'Название',
  },
  {
    field: 'category',
    headerName: 'Категория',
  },
  {
    field: 'brand',
    headerName: 'Бренд',
  },
  {
    field: 'area',
    headerName: 'Область',
  },
  {
    field: 'price',
    headerName: 'Цена',
  },
  {
    field: 'edit',
    headerName: 'Редактировать',
  },
  {
    field: 'delte',
    headerName: 'Удалить',
  },
];

export const buttonText = {
  edit: cells[5].headerName,
  delete: cells[6].headerName,
};
