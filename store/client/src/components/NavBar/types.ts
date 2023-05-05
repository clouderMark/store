import {EPath} from '../../enums/EPath';

export interface IArticle {
  link: EPath;
  title: string;
  list: IList[];
}

interface IList {
  link: string;
  content: string;
}
