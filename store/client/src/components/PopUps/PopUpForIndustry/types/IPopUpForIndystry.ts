import {Dispatch, SetStateAction, FormEvent} from 'react';
import {IParagraphs} from '../../../../types/types';
import IDefaultValue from '../../../EditIndustry/IDefaultValue';

export interface IPopUpForIndystry {
  cardTitle: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  id: number | null;
  handleSubmit(event: FormEvent<HTMLFormElement>): void;
  paragraphs: IParagraphs[];
  setParagraphs: Dispatch<SetStateAction<IParagraphs[]>>;
  infoListItems: IParagraphs[];
  setInfoListItems: Dispatch<SetStateAction<IParagraphs[]>>;
  infoParagraphs: IParagraphs[];
  setInfoParagraphs: Dispatch<SetStateAction<IParagraphs[]>>;
  opinionParagraphs: IParagraphs[];
  setOpinionParagraphs: Dispatch<SetStateAction<IParagraphs[]>>;
  opinionListItems: IParagraphs[];
  setOpinionListItems: Dispatch<SetStateAction<IParagraphs[]>>;
  child?: {component: JSX.Element; value: string};
  value: IDefaultValue;
  dispatch: Dispatch<{type: string; payload?: any}>; // eslint-disable-line
}
