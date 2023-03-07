import {Dispatch, SetStateAction} from 'react';

export interface IPropsWithId extends IProps {
  id: number;
}

export interface IProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setChange: Dispatch<SetStateAction<boolean>>;
}
