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

  public get categories() {
    return this._categories;
  }

  public set categories(categories: ICatalogItem[]) {
    this._categories = categories;
  }

  public get brands() {
    return this._brands;
  }

  public set brands(brands: ICatalogItem[]) {
    this._brands = brands;
  }

  public get products() {
    return this._products;
  }

  public set products(products: IRow[]) {
    this._products = products;
  }

  public get category() {
    return this._category;
  }

  public set category(id: number | null) {
    this.page = 1;
    this._category = id;
  }

  public get brand() {
    return this._brand;
  }

  public set brand(id: number | null) {
    this.page = 1;
    this._brand = id;
  }

  public get page() {
    return this._page;
  }

  public set page(page: number) {
    this._page = page;
  }

  public get count() {
    return this._count;
  }

  public set count(count: number) {
    this._count = count;
  }

  public get pages() { // всего страниц
    return Math.ceil(this.count / this.limit);
  }

  public set limit(limit: number) {
    this._limit = limit;
  }

  public get limit() {
    return this._limit;
  }
}

export default CatalogStore;
