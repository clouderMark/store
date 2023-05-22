import {Dispatch, SetStateAction, FormEvent} from 'react';
import IDefaultValue from '../../../EditIndustry/IDefaultValue';

export interface IPopUpForIndystry {
  cardTitle: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  id: number | null;
  handleSubmit(event: FormEvent<HTMLFormElement>): void;
  child?: {component: JSX.Element; value: string};
  value: IDefaultValue;
  dispatch: Dispatch<{type: string; payload?: any}>; // eslint-disable-line
}
