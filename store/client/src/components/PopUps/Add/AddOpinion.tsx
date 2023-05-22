import {ChangeEvent, Dispatch, Fragment} from 'react';
import {TextField} from '@mui/material';
import ContainerWithTwoColumns from '../../ContainerWithTwoColumns/ContainerWithTwoColumns';
import CardInputImage from '../CardInputImage/CardInputImage';
import AddTextField from './AddTextField';
import {IParagraphs} from '../../../types/types';

enum EName {
  opinionTitle = 'opinionTitle',
  opinionListTitle = 'opinionListTitle',
  opinionImage = 'opinionImage',
  opinionName = 'opinionName',
  opinionPhone = 'opinionPhone',
  opinionFax = 'opinionFax',
  opinionEmail = 'opinionEmail',
  opinionImageUrl = 'opinionImageUrl',
  opinionParagraphs = 'opinionParagraphs',
  opinionListItems = 'opinionListItems',
}

interface IValue {
  [EName.opinionTitle]: string;
  [EName.opinionListTitle]: string;
  [EName.opinionName]: string;
  [EName.opinionPhone]: string;
  [EName.opinionFax]: string;
  [EName.opinionEmail]: string;
  [EName.opinionImageUrl]: string;
  [EName.opinionParagraphs]: IParagraphs[];
  [EName.opinionListItems]: IParagraphs[];
}

interface IProps {
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
  handleImageChange(event: ChangeEvent<HTMLInputElement>): void;
  value: IValue;
  dispatch: Dispatch<{type: string; payload?: any}>; // eslint-disable-line
}

const AddOpinion = (props: IProps) => {
  const {value, dispatch} = props;
  const column2 = [
    {
      name: EName.opinionName,
      value: value[EName.opinionName],
      placeholder: 'Имя',
    },
    {
      name: EName.opinionPhone,
      value: value[EName.opinionPhone],
      placeholder: 'Телефон',
    },
    {
      name: EName.opinionFax,
      value: value[EName.opinionFax],
      placeholder: 'Факс',
    },
    {
      name: EName.opinionEmail,
      value: value[EName.opinionEmail],
      placeholder: 'E-mail',
    },
  ];

  return (
    <ContainerWithTwoColumns
      firstColumn={
        <>
          <TextField
            name={EName.opinionTitle}
            value={value[EName.opinionTitle]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
            placeholder="Заголовок"
            sx={{width: '100%', mt: '30px'}}
          />
          <AddTextField
            name={EName.opinionParagraphs}
            value={value}
            dispatch={dispatch}
            title={'Добавить абзац'}
            placeholder={'Параграф совета'}
          />
          <TextField
            name={EName.opinionListTitle}
            value={value[EName.opinionListTitle]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
            placeholder="Заголовок"
            sx={{width: '100%', mt: '30px'}}
          />
          <AddTextField
            name={EName.opinionListItems}
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
            value={value[EName.opinionImageUrl]}
            name={EName.opinionImage}
            handleImageChange={props.handleImageChange}
          />
          {column2.map((el, i) => (
            <Fragment key={i}>
              <TextField
                name={el.name}
                value={el.value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
                placeholder={el.placeholder}
                sx={{width: '100%', mt: '30px'}}
              />
            </Fragment>
          ))}
        </>
      }
      firstColumnWidth={70}
    />
  );
};

export default AddOpinion;
