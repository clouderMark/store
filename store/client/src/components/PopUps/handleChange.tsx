import {ChangeEvent, Dispatch} from 'react';

export enum EType {
  valid = 'valid',
  name = 'name',
}

// eslint-disable-next-line
const handleChange = (dispatch: Dispatch<{type: string; payload?: any}>) => {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const {name} = event.target;
    const {value} = event.target;

    if (name === EType.name) {
      dispatch({type: EType.valid, payload: value.trim() !== ''});
    }

    dispatch({type: name, payload: value});
  };
};

export default handleChange;
