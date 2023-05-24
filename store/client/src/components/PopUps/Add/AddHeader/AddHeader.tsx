import {ChangeEvent, Dispatch} from 'react';
import {TextField} from '@mui/material';
import AddTextField from '../AddTextField';
import EType from './EType';
import IDefaultValue from './IDefaultValue';
import inputChange from '../../handleChange';
import CardInputImage from '../../CardInputImage/CardInputImage';
import imageChange from '../../handleImageChange';

interface IProps {
  value: IDefaultValue;
  dispatch: Dispatch<{type: string; payload?: any}>; // eslint-disable-line
}

const AddHeader = (props: IProps) => {
  const {value, dispatch} = props;

  const handleChange = inputChange(dispatch);
  const handleImageChange = imageChange(dispatch);

  return (
    <>
      <CardInputImage
        value={value[EType.headerImageUrl]}
        name={EType.headerImage}
        handleImageChange={handleImageChange}
      />
      <TextField
        name={EType.title}
        value={value[EType.title]}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        placeholder="Заголовок индустрии"
        sx={{width: '100%', mt: '30px'}}
      />
      <AddTextField
        name={EType.paragraphs}
        value={value}
        dispatch={dispatch}
        title={'Добавить абзац'}
        placeholder={'Параграф индустрии'}
      />
    </>
  );
};

export default AddHeader;
