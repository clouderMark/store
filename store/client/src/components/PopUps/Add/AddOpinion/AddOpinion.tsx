import {ChangeEvent, Dispatch, Fragment} from 'react';
import {Box, TextField, Typography} from '@mui/material';
import ContainerWithTwoColumns from '../../../ContainerWithTwoColumns/ContainerWithTwoColumns';
import CardInputImage from '../../CardInputImage/CardInputImage';
import AddTextField from '../AddTextField';
import EOpinion from './EOpinion';
import IDefaultValue from './IDefaultValue';
import inputChange from '../../handleChange';
import imageChange from '../../handleImageChange';

interface IProps {
  value: IDefaultValue;
  dispatch: Dispatch<{type: string; payload?: any}>; // eslint-disable-line
}

const AddOpinion = (props: IProps) => {
  const {value, dispatch} = props;

  const handleChange = inputChange(dispatch);
  const handleImageChange = imageChange(dispatch);

  const column2 = [
    {
      name: EOpinion.opinionName,
      value: value[EOpinion.opinionName],
      placeholder: 'Имя',
    },
    {
      name: EOpinion.opinionPhone,
      value: value[EOpinion.opinionPhone],
      placeholder: 'Телефон',
    },
    {
      name: EOpinion.opinionFax,
      value: value[EOpinion.opinionFax],
      placeholder: 'Факс',
    },
    {
      name: EOpinion.opinionEmail,
      value: value[EOpinion.opinionEmail],
      placeholder: 'E-mail',
    },
  ];

  return (
    <Box>
      <Typography sx={{mb: '-40px', mt: '20px'}}>Экспертное мнение</Typography>
      <ContainerWithTwoColumns
        firstColumn={
          <>
            <TextField
              name={EOpinion.opinionTitle}
              value={value[EOpinion.opinionTitle]}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              placeholder="Заголовок"
              sx={{width: '100%', mt: '30px'}}
            />
            <AddTextField
              name={EOpinion.opinionParagraphs}
              value={value}
              dispatch={dispatch}
              title={'Добавить абзац'}
              placeholder={'Параграф совета'}
            />
            <TextField
              name={EOpinion.opinionListTitle}
              value={value[EOpinion.opinionListTitle]}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              placeholder="Заголовок"
              sx={{width: '100%', mt: '30px'}}
            />
            <AddTextField
              name={EOpinion.opinionListItems}
              value={value}
              dispatch={dispatch}
              title={'Добавить пункт'}
              placeholder={'пункт списка'}
            />
          </>
        }
        secondColumn={
          <>
            <CardInputImage
              value={value[EOpinion.opinionImageUrl]}
              name={EOpinion.opinionImage}
              handleImageChange={handleImageChange}
            />
            {column2.map((el, i) => (
              <Fragment key={i}>
                <TextField
                  name={el.name}
                  value={el.value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                  placeholder={el.placeholder}
                  sx={{width: '100%', mt: '30px'}}
                />
              </Fragment>
            ))}
          </>
        }
        firstColumnWidth={70}
      />
    </Box>
  );
};

export default AddOpinion;
