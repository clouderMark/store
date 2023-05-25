import {ChangeEvent, Dispatch} from 'react';
import {TextField} from '@mui/material';
import ContainerWithTwoColumns from '../../../ContainerWithTwoColumns/ContainerWithTwoColumns';
import CardInputImage from '../../CardInputImage/CardInputImage';
import AddTextField from '../AddTextField';
import IDefaultValue from './IDefaultValue';
import EField from './EField';
import inputChange from '../../handleChange';
import imageChange from '../../handleImageChange';

interface IProps {
  value: IDefaultValue;
  dispatch: Dispatch<{type: string; payload?: any}>; // eslint-disable-line
}

const AddInfo = (props: IProps) => {
  const {value, dispatch} = props;

  const handleChange = inputChange(dispatch);
  const handleImageChange = imageChange(dispatch);

  return (
    <ContainerWithTwoColumns
      firstColumn={
        <CardInputImage
          value={value[EField.infoImageUrl]}
          name={EField.infoImage}
          handleImageChange={handleImageChange}
        />
      }
      secondColumn={
        <>
          <TextField
            name={EField.infoTitle}
            value={value[EField.infoTitle]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            placeholder="Заголовок"
            sx={{width: '100%', mt: '30px'}}
          />
          <TextField
            name={EField.infoHeader}
            value={value[EField.infoHeader]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            placeholder="Подзаголовок"
            sx={{width: '100%', mt: '30px'}}
          />
          <TextField
            name={EField.infoListTitle}
            multiline
            rows={4}
            value={value[EField.infoListTitle]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            placeholder="Заголовок списка"
            sx={{width: '100%', mt: '30px'}}
          />
          <AddTextField
            name={EField.infoListItems}
            value={value}
            dispatch={dispatch}
            title={'Добавить пункт'}
            placeholder={'Пункт списка'}
          />
          <AddTextField
            name={EField.infoParagraphs}
            value={value}
            dispatch={dispatch}
            title={'Добавить параграф'}
            placeholder={'Параграф'}
          />
        </>
      }
    />
  );
};

export default AddInfo;
