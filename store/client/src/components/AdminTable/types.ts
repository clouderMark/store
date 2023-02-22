import {ICatalogItem, IProductWithProps} from '../../types/types';

export interface IProps {
  title: 'brand' | 'category' | 'goods';
  children: Array<() => JSX.Element>;
  handleCreateClick(): void;
  handleUpdateClick(id: number): void;
  handleDeleteClick(id: number): void;
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
