import {ICatalogItem, IProductWithProps} from '../../types/types';

export interface ITitle {
  title: 'brand' | 'category' | 'goods';
}

export interface ITableBodyCells extends ITitle {
  items: Array<ICatalogItem | IProductWithProps>;
  handleUpdateClick(id: number): void;
  handleDeleteClick(id: number): void;
}

export interface IProps extends ITableBodyCells {
  children: Array<() => JSX.Element>;
  handleCreateClick(): void;
  items: Array<ICatalogItem | IProductWithProps>;
  pagination?: {
    totalPages: number;
    pagination(): JSX.Element;
  };
}

export interface ICells {
  field: string;
  headerName: string;
}
