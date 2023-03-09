import {ICells} from './types';

export const cells: ICells[] = [
  {
    field: 'name',
    headerName: 'Название',
  },
  {
    field: 'industry',
    headerName: 'Индустрии',
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
    field: 'article',
    headerName: 'Артикл',
  },
  {
    field: 'weight',
    headerName: 'Масса',
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
  edit: cells[7].headerName,
  delete: cells[8].headerName,
};
