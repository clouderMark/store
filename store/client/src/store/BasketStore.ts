import {makeAutoObservable} from 'mobx';
import {IItem} from '../types/types';

class BasketStore {
  private _products: IItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public get products(): IItem[] {
    return this._products;
  }

  public set products(products: IItem[]) {
    this._products = products;
  }

  public get count(): number { // Всего позиций в корзине
    return this._products.length;
  }

  public get sum(): number { // стоимость всех товаров в корзине
    return this._products.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}

export default BasketStore;
