interface ICells {
  field: string;
  headerName: string;
}

export const cells: ICells[] = [
  {
    field: 'naming',
    headerName: 'Наименование',
  },
  {
    field: 'amount',
    headerName: 'Количество',
  },
  {
    field: 'price',
    headerName: 'Цена',
  },
  {
    field: 'sum',
    headerName: 'Сумма',
  },
  {
    field: 'delete',
    headerName: 'Удалить',
  },
];
