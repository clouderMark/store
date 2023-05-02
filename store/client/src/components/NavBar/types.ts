export interface IArticle {
  link: string;
  title: string;
  list: IList[];
}

interface IList {
  link: string;
  content: string;
}
