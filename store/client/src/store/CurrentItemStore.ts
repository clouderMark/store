import {makeAutoObservable} from 'mobx';

class CurrentItemStore {
  private _productName = '';

  private _subBranchName = '';

  constructor() {
    makeAutoObservable(this);
  }

  get productName() {
    return this._productName;
  }

  set productName(name) {
    this._productName = name;
  }

  get subBranchName() {
    return this._subBranchName;
  }

  set subBranchName(name) {
    this._subBranchName = name;
  }
}

export default CurrentItemStore;
