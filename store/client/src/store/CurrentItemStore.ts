import {makeAutoObservable} from 'mobx';

class CurrentItemStore {
  private _productName = '';

  constructor() {
    makeAutoObservable(this);
  }

  get productName() {
    return this._productName;
  }

  set productName(name) {
    this._productName = name;
  }
}

export default CurrentItemStore;
