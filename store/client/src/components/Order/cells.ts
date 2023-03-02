export const cells: ICells[] = [
  {
    field: 'name',
    headerName: 'Название',
  },
  {
    field: 'price',
    headerName: 'Цена',
  },
  {
    field: 'amount',
    headerName: 'Кол-во',
  },
  {
    field: 'sum',
    headerName: 'Сумма',
  },
];

interface ICells {
  field: string;
  headerName: string;
}
