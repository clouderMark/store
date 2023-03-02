interface IStatus {
  value: number,
  status: string,
}

export const statusList: IStatus[] = [
  {
    value: 0,
    status: 'Новый',
  },
  {
    value: 1,
    status: 'В работе',
  },
  {
    value: 2,
    status: 'Завершен',
  },
];

export const getStatusText = (orderStatus: number): string => statusList.find((el) => el.value === orderStatus)!.status;
