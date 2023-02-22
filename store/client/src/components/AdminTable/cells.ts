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
  edit: cells[4].headerName,
  delete: cells[5].headerName,
};
