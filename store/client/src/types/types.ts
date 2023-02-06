interface IId {
  id: number;
}

export interface IItem extends IId {
  name: string;
  price: number;
  quantity: number;
}

export interface IBasket extends IId {
  products: IItem[] | [];
}

export interface ICatalogItem extends IId {
  name: string;
  updatedAt: string;
  createdAt: string;
}

export interface IProduct extends ICatalogItem {
  brandId: number;
  categoryId: number;
  image: string;
  price: number;
  rating: number;
}

export interface IAllProducts {
  count: number;
  rows: IRow[];
}

export interface IUpdatedProduct extends IProduct {
  updatedAt: string;
  props: IProperty[];
}

export interface IRow extends IProduct {
  brand: ICatalogItem;
  category: ICatalogItem;
}

export interface IRating {
  rates: number;
  rating: number;
  votes: number;
}

export interface IProperty extends ICatalogItem {
  productId: number,
  value: string,
}

export interface IOrderBody {
  address: string,
  comment: string | null,
  email: string,
  name: string,
  phone: string,
}

export interface IOrder extends IOrderBody {
  amount: number,
  createdAt: string,
  id: 1,
  prettyCreatedAt: string,
  prettyUpdatedAt: string,
  status: number,
  updatedAt: string,
  userId: null | number,
}

export interface IOrderWithItems extends IOrder {
  items: IItem[],
}

export interface IRegistration {
  email: string,
  exp?: number,
  iat?: number
  id: number
  role: 'USER' | 'ADMIN',
}
