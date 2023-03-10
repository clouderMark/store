import {makeAutoObservable} from 'mobx';

class ProductItemStore {
  private _name = '';

  constructor() {
    makeAutoObservable(this);
  }

  get name() {
    return this._name;
  }

  set name(thatName) {
    this._name = thatName;
  }
}

export default ProductItemStore;
