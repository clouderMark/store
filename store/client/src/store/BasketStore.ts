import {makeAutoObservable} from 'mobx';
import {IItem} from '../types/types';

class BasketStore {
  _products: IItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get products() {
    return this._products;
  }

  set products(products: IItem[]) {
    this._products = products;
  }

  get count() { // Всего позиций в корзине
    return this._products.length;
  }

  get sum() { // стоимость всех товаров в корзине
    return this._products.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}

export default BasketStore;
