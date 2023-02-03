interface IId {
  id: number;
}

interface IBasketProduct extends IId {
  name: string;
  price: number;
  quantity: number;
}

export interface IBasket extends IId {
  products: IBasketProduct[] | [];
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
