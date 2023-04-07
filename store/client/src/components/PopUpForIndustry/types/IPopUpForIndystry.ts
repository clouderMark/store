import {ChangeEvent, Dispatch, SetStateAction, FormEvent} from 'react';
import {IParagraphs} from '../../../types/types';

export interface IPopUpForIndystry {
  cardTitle: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  id: number | null;
  name: string;
  cardImage: string | null;
  headerImage: string | null;
  handleImageChange(event: ChangeEvent<HTMLInputElement>): void;
  valid: boolean | null;
  // inputRef: React.RefObject<HTMLInputElement>;
  handleSubmit(event: FormEvent<HTMLFormElement>): void;
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
  title: string;
  paragraphs: IParagraphs[];
  setParagraphs: Dispatch<SetStateAction<IParagraphs[]>>;
}
