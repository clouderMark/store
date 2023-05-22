import {ChangeEvent, Dispatch} from 'react';

// eslint-disable-next-line
const handleImageChange = (dispatch: Dispatch<{type: string; payload?: any}>) => {
  return (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const {name} = event.target;
      const newImageUrl = URL.createObjectURL(file);

      dispatch({type: name, payload: file});
      dispatch({type: `${name}Url`, payload: newImageUrl});
    }
  };
};

export default handleImageChange;
