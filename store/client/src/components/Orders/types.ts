import {Dispatch, SetStateAction} from 'react';
import {IOrder} from '../../types/types';

export interface IProps {
  items: IOrder[];
  admin: boolean;
  setItems?: Dispatch<SetStateAction<IOrder[] | null>>;
}
