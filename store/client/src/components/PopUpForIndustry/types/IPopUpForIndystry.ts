import {ChangeEvent, Dispatch, SetStateAction, FormEvent} from 'react';
import {IParagraphs} from '../../../types/types';
import {IDefaultValue} from '../../EditIndustry/reducer';

export interface IPopUpForIndystry {
  cardTitle: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  id: number | null;
  handleImageChange(event: ChangeEvent<HTMLInputElement>): void;
  valid: boolean | null;
  handleSubmit(event: FormEvent<HTMLFormElement>): void;
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
  paragraphs: IParagraphs[];
  setParagraphs: Dispatch<SetStateAction<IParagraphs[]>>;
  infoListItems: IParagraphs[];
  setInfoListItems: Dispatch<SetStateAction<IParagraphs[]>>;
  infoParagraphs: IParagraphs[];
  setInfoParagraphs: Dispatch<SetStateAction<IParagraphs[]>>;
  child?: {component: JSX.Element; value: string};
  value: IDefaultValue;
}
