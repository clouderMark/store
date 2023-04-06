import {makeAutoObservable} from 'mobx';

class CurrentItemStore {
  private _productName = '';

  private _branchName = '';

  constructor() {
    makeAutoObservable(this);
  }

  get productName() {
    return this._productName;
  }

  set productName(name) {
    this._productName = name;
  }

  get branchName() {
    return this._branchName;
  }

  set branchName(name) {
    this._branchName = name;
  }
}

export default CurrentItemStore;
