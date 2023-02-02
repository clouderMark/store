import {makeAutoObservable} from 'mobx';

class CatalogStore {
  _categories = [];

  _brands = [];

  _products = [];

  _category = null; // выбранная категория

  _brand = null;

  _page = 1;

  _count = 0; // сколько всего товаров

  _limit = 20; // товаров на страницу

  constructor() {
    makeAutoObservable(this);
  }

  get categories() {
    return this._categories;
  }

  set categories(categories) {
    this._categories = categories;
  }

  get brands() {
    return this._brands;
  }

  set brands(brands) {
    this._brands = brands;
  }

  get products() {
    return this._products;
  }

  set products(products) {
    this._products = products;
  }

  get category() {
    return this._category;
  }

  set category(id) {
    this.page = 1;
    this._category = id;
  }

  get brand() {
    return this._brand;
  }

  set brand(id) {
    this.page = 1;
    this._brand = id;
  }

  get page() {
    return this._page;
  }

  set page(page) {
    this._page = page;
  }

  get count() {
    return this._count;
  }

  set count(count) {
    this._count = count;
  }

  get pages() { // всего страниц
    return Math.ceil(this.count / this.limit);
  }

  set limit(limit) {
    this._limit = limit;
  }

  get limit() {
    return this._limit;
  }
}

export default CatalogStore;
