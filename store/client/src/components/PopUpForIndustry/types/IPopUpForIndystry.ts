import {ChangeEvent, Dispatch, SetStateAction, FormEvent} from 'react';
import {IParagraphs} from '../../../types/types';

export interface IPopUpForIndystry {
  cardTitle: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  id: number | null;
  name: string;
  cardImage: string;
  headerImage: string;
  handleImageChange(event: ChangeEvent<HTMLInputElement>): void;
  valid: boolean | null;
  handleSubmit(event: FormEvent<HTMLFormElement>): void;
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
  title: string;
  paragraphs: IParagraphs[];
  setParagraphs: Dispatch<SetStateAction<IParagraphs[]>>;
  infoImage: string;
  infoTitle: string;
  infoHeader: string;
  infoListTitle: string;
  infoListItems: IParagraphs[];
  setInfoListItems: Dispatch<SetStateAction<IParagraphs[]>>;
  infoParagraphs: IParagraphs[];
  setInfoParagraphs: Dispatch<SetStateAction<IParagraphs[]>>;
  child?: {component: JSX.Element, value: string};
}
