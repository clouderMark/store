import React, {ChangeEvent, Dispatch, SetStateAction} from 'react';
import {TextField} from '@mui/material';
import ContainerWithTwoColumns from '../../ContainerWithTwoColumns/ContainerWithTwoColumns';
import CardInputImage from '../CardInputImage';
import AddTextField from '../AddTextField';
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

const SetOpinion = (props: IProps) => (
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
          listItem={'Параграф совета'}
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
          listItem={'пункт списка'}
        />
      </>
    }
    secondColumn={
      <>
        <CardInputImage
          id={props.image.id}
          image={props.image.image}
          imageInputName={props.image.name}
          handleImageChange={props.image.handleImageChange}
        />
        <TextField
          name={props.nameName}
          value={props.nameValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
          placeholder="Имя"
          sx={{width: '100%', mt: '30px'}}
        />
        <TextField
          name={props.phoneName}
          value={props.phoneValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
          placeholder="Телефон"
          sx={{width: '100%', mt: '30px'}}
        />
        <TextField
          name={props.faxName}
          value={props.faxValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
          placeholder="Факс"
          sx={{width: '100%', mt: '30px'}}
        />
        <TextField
          name={props.emailName}
          value={props.emailValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
          placeholder="E-mail"
          sx={{width: '100%', mt: '30px'}}
        />
      </>
    }
    firstColumnWidth={70}
  />
);

export default SetOpinion;
