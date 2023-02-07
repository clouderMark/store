import {makeAutoObservable} from 'mobx';
import {ICatalogItem, IRow} from '../types/types';

class CatalogStore {
  private _categories: ICatalogItem[] = [];

  private _brands: ICatalogItem[] = [];

  private _products: IRow[] = [];

  private _category: number | null = null; // выбранная категория

  private _brand: number | null = null;

  private _page = 1;

  private _count = 0; // сколько всего товаров

  private _limit = 20; // товаров на страницу

  constructor() {
    makeAutoObservable(this);
  }

  get categories() {
    return this._categories;
  }

  set categories(categories: ICatalogItem[]) {
    this._categories = categories;
  }

  get brands() {
    return this._brands;
  }

  set brands(brands: ICatalogItem[]) {
    this._brands = brands;
  }

  get products() {
    return this._products;
  }

  set products(products: IRow[]) {
    this._products = products;
  }

  get category() {
    return this._category;
  }

  set category(id: number | null) {
    this.page = 1;
    this._category = id;
  }

  get brand() {
    return this._brand;
  }

  set brand(id: number | null) {
    this.page = 1;
    this._brand = id;
  }

  get page() {
    return this._page;
  }

  set page(page: number) {
    this._page = page;
  }

  get count() {
    return this._count;
  }

  set count(count: number) {
    this._count = count;
  }

  get pages() { // всего страниц
    return Math.ceil(this.count / this.limit);
  }

  set limit(limit: number) {
    this._limit = limit;
  }

  get limit() {
    return this._limit;
  }
}

export default CatalogStore;
