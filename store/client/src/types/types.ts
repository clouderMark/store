interface IId {
  id: number;
}

export interface IItem extends IId {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IBasket extends IId {
  products: IItem[] | [];
}

export interface ICatalogItem extends IId {
  name: string;
}

export interface ICatalogItemWithImage extends ICatalogItem {
  cardImage: string;
}

export interface IProduct extends ICatalogItem {
  solutionId: number;
  industryId: number;
  areaId: number;
  image: string | null;
  price: number;
  rating: number;
  article: number;
  weight: number;
}

export interface IAllProducts {
  count: number;
  rows: IProductWithProps[];
}

export interface IUpdatedProduct extends IProduct {
  updatedAt: string;
  props: IProperty[];
}

export interface IProductWithProps extends IProduct {
  solution: ICatalogItem;
  industry: ICatalogItem;
  area: ICatalogItem;
  props: IProperty[];
}

export interface IRating {
  rates: number;
  rating: number;
  votes: number;
}

export interface IProperty extends ICatalogItem {
  productId: number;
  value: string;
}

export interface IOrderBody {
  address: string;
  comment: string | null;
  email: string;
  name: string;
  phone: string;
}

export interface IOrder extends IOrderBody {
  amount: number;
  createdAt: string;
  id: number;
  prettyCreatedAt: string;
  prettyUpdatedAt: string;
  status: number;
  updatedAt: string;
  userId: null | number;
}

export interface IOrderWithItems extends IOrder {
  items: IItem[];
}

export interface IRegistration {
  email: string;
  exp?: number;
  iat?: number;
  id: number;
  role: 'USER' | 'ADMIN';
}

export interface IObject {
  [key: string]: string;
}

export interface IData<T> {
  data: T;
}

export interface IDefaultValue {
  name: string;
  price: string;
  industry: string;
  solution: string;
  area: string;
  article: string;
  weight: string;
}

export interface IDefaultValid {
  name: null;
  price: null;
  industry: null;
  solution: null;
  area: null;
  article: null;
  weight: null;
}

export interface IValid {
  name: boolean;
  price: boolean;
  industry: boolean;
  solution: boolean;
  area: boolean;
  article: boolean;
  weight: boolean;
}

export interface IProductProp {
  id: null | number;
  name: string;
  value: string;
  unique: string;
  append: boolean;
  change?: boolean;
  remove?: boolean;
}

export interface IMessageBody {
  company: string;
  name: string;
  email: string;
  phone: string;
  question: string;
  type: string;
}

export interface IMessage extends IMessageBody {
  id: number;
}

export interface ISubscribe {
  createdAt: string;
  email: string;
  id: number;
  updatedAt: string;
}

export interface ISlider {
  id: number;
  name: string;
  image: string;
}

export interface IButtons {
  content: string;
  color: 'first';
  variant: 'contained' | 'outlined';
  to: string;
}

export interface ICentererContainer {
  title: string;
  header: string;
  content: string;
  images: IImages[];
}

interface IImages {
  // eslint-disable-next-line
  img: any;
  alt: string;
}

export interface IAreaResponse extends ICatalogItem {
  cardImage: string;
  headerImage: string;
  title: string;
  paragraphs: IListItem[];
  industryId?: number;
  info: IInfo;
  opinion: IOpinion;
  sliderImage?: string;
}

export interface IInfo {
  id: number;
  image: string;
  listTitle: string;
  title: string;
  header: string;
  listItems: IListItem[];
  paragraphs: IListItem[];
}

export interface IListItem extends IId {
  value: string;
}

export interface IOpinion {
  id: number;
  title: string;
  name: string;
  image: string;
  email: string;
  fax: string;
  listTitle: string;
  phone: string;
  listItems: IListItem[];
  paragraphs: IListItem[];
}

export interface IParagraphsRelatedTo extends IParagraphs {
  relatedTo: string;
}

export interface IParagraphs extends IFilteredParagraphs {
  unique: string;
}

export interface IFilteredParagraphs {
  id: null | number;
  value: string;
}

export interface IImage {
  image: File | null;
  imageUrl: string;
  relatedTo: string;
  id: null | number;
}

export interface IImageRelatedTo {
  image: string;
  relatedTo: string;
  id: null | number;
}

export interface IFetchSolution extends IId {
  name: string;
  title: string;
  paragraphs: IListItem[];
  cardImage: string;
  headerImage: string;
  infoImages: IImageRelatedTo[];
  infoParagraphs: IParagraphsRelatedTo[];
  infoTitle: IParagraphs[];
  opinion: IOpinion;
}
