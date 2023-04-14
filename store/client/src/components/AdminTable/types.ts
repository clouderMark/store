import {ICatalogItem, IProductWithProps, IAreaResponse} from '../../types/types';

export interface ITitle {
  title: 'solution' | 'industry' | 'goods' | 'area' | 'subindustry';
}

export interface ITableBodyCells extends ITitle {
  items: Array<ICatalogItem | IProductWithProps | IAreaResponse>;
  handleUpdateClick(id: number): void;
  handleDeleteClick(id: number): void;
}

export interface IProps extends ITableBodyCells {
  children: Array<() => JSX.Element>;
  handleCreateClick(): void;
  pagination?: {
    totalPages: number;
    pagination(): JSX.Element;
  };
  headCells: ICells[];
}

export interface ICells {
  field: string;
  value: string;
}
