import {makeAutoObservable} from 'mobx';
import {ICatalogItem, IProductWithProps} from '../types/types';

class CatalogStore {
  private _industries: ICatalogItem[] = [];

  private _solutions: ICatalogItem[] = [];

  private _areas: ICatalogItem[] = [];

  private _products: IProductWithProps[] = [];

  private _industry: number[] = []; // выбранная индустрия

  private _solution: number[] = [];

  private _area: number[] = [];

  private _page = 1;

  private _count = 0; // сколько всего товаров

  private _limit = 20; // товаров на страницу

  constructor() {
    makeAutoObservable(this);
  }

  get industries() {
    return this._industries;
  }

  set industries(industries: ICatalogItem[]) {
    this._industries = industries;
  }

  get solutions() {
    return this._solutions;
  }

  set solutions(solutions: ICatalogItem[]) {
    this._solutions = solutions;
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

  get industry() {
    return this._industry;
  }

  set industry(industry: number[]) {
    this.page = 1;
    this._industry = industry;
  }

  get solution() {
    return this._solution;
  }

  set solution(solution: number[]) {
    this.page = 1;
    this._solution = solution;
  }

  get area() {
    return this._area;
  }

  set area(newArea: number[]) {
    this.page = 1;
    this._area = newArea;
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
