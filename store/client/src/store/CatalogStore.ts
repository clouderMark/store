import {makeAutoObservable} from 'mobx';
import {ICatalogItem, IProductWithProps} from '../types/types';

class CatalogStore {
  private _categories: ICatalogItem[] = [];

  private _brands: ICatalogItem[] = [];

  private _areas: ICatalogItem[] = [];

  private _products: IProductWithProps[] = [];

  private _category: number[] = []; // выбранная категория

  private _brand: number | null = null;

  private _area: number | null = null;

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

  get areas() {
    return this._areas;
  }

  set areas(areas: ICatalogItem[]) {
    this._areas = areas;
  }

  get products() {
    return this._products;
  }

  set products(products: IProductWithProps[]) {
    this._products = products;
  }

  get category() {
    return this._category;
  }

  set category(newCategory: number[]) {
    this.page = 1;
    this._category = newCategory;
  }

  get brand() {
    return this._brand;
  }

  set brand(id: number | null) {
    this.page = 1;
    this._brand = id;
  }

  get area() {
    return this._area;
  }

  set area(id: number | null) {
    this.page = 1;
    this._area = id;
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
