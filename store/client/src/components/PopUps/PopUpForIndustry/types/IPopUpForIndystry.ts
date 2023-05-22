import {Dispatch, SetStateAction, FormEvent} from 'react';
import IDefaultValue from '../../../EditIndustry/IDefaultValue';
import IOpinionDefaultValue from '../../Add/AddOpinion/IDefaultValue';
import IDefaultInfoValue from '../../Add/AddOneImageWithTextFields/IDefaultValue';

export interface IPopUpForIndystry {
  cardTitle: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  id: number | null;
  handleSubmit(event: FormEvent<HTMLFormElement>): void;
  child?: {component: JSX.Element; value: string};
  value: IDefaultValue;
  dispatch: Dispatch<{type: string; payload?: any}>; // eslint-disable-line
  opinionValue: IOpinionDefaultValue;
  dispatchOpinion: Dispatch<{type: string; payload?: any}>; // eslint-disable-line
  infoValue: IDefaultInfoValue;
  dispatchInfo: Dispatch<{type: string; payload?: any}>; // eslint-disable-line
}
