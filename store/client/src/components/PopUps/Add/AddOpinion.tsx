import {ChangeEvent, Dispatch, SetStateAction, Fragment} from 'react';
import {TextField} from '@mui/material';
import ContainerWithTwoColumns from '../../ContainerWithTwoColumns/ContainerWithTwoColumns';
import CardInputImage from '../CardInputImage';
import AddTextField from './AddTextField';
import {IParagraphs} from '../../../types/types';

interface IProps {
  titleName: string;
  titleValue: string;
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
  opinionParagraphs: IParagraphs[];
  setOpinionParagraphs: Dispatch<SetStateAction<IParagraphs[]>>;
  listTitleName: string;
  listTitleValue: string;
  opinionListItems: IParagraphs[];
  setOpinionListItems: Dispatch<SetStateAction<IParagraphs[]>>;
  image: {
    id: number | null;
    image: string;
    name: string;
    handleImageChange(event: ChangeEvent<HTMLInputElement>): void;
  };
  nameName: string;
  nameValue: string;
  phoneName: string;
  phoneValue: string;
  faxName: string;
  faxValue: string;
  emailName: string;
  emailValue: string;
}

const AddOpinion = (props: IProps) => {
  const column2 = [
    {
      name: props.nameName,
      value: props.nameValue,
      placeholder: 'Имя',
    },
    {
      name: props.phoneName,
      value: props.phoneValue,
      placeholder: 'Телефон',
    },
    {
      name: props.faxName,
      value: props.faxValue,
      placeholder: 'Факс',
    },
    {
      name: props.emailName,
      value: props.emailValue,
      placeholder: 'E-mail',
    },
  ];

  return (
    <ContainerWithTwoColumns
      firstColumn={
        <>
          <TextField
            name={props.titleName}
            value={props.titleValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
            placeholder="Заголовок"
            sx={{width: '100%', mt: '30px'}}
          />
          <AddTextField
            paragraphs={props.opinionParagraphs}
            setParagraphs={props.setOpinionParagraphs}
            title={'Добавить абзац'}
            placeholder={'Параграф совета'}
          />
          <TextField
            name={props.listTitleName}
            value={props.listTitleValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
            placeholder="Заголовок"
            sx={{width: '100%', mt: '30px'}}
          />
          <AddTextField
            paragraphs={props.opinionListItems}
            setParagraphs={props.setOpinionListItems}
            title={'Добавить пункт'}
            placeholder={'пункт списка'}
          />
        </>
      }
      secondColumn={
        <>
          <CardInputImage
            id={props.image.id}
            value={props.image.image}
            name={props.image.name}
            handleImageChange={props.image.handleImageChange}
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
