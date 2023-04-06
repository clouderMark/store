import React, {ChangeEvent, Dispatch, SetStateAction, FormEvent} from 'react';

export interface IPopUpForIndystry {
  title: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  id: number | null;
  name: string;
  cardImage: string | null;
  headerImage: string | null;
  handleImageChange(event: ChangeEvent<HTMLInputElement>): void;
  valid: boolean | null;
  inputRef: React.RefObject<HTMLInputElement>;
  handleSubmit(event: FormEvent<HTMLFormElement>): void;
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
}
