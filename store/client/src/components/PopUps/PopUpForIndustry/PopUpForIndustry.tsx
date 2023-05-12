import React, {ChangeEvent} from 'react';
import {
  Box,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import {IPopUpForIndystry} from './types/IPopUpForIndystry';
import AddTextField from '../Add/AddTextField';
import ContainerWithTwoColumns from '../../ContainerWithTwoColumns/ContainerWithTwoColumns';
import CardInputImage from '../CardInputImage';
import {EType} from '../../EditIndustry/EType';
import AddOpinion from '../Add/AddOpinion';
import DialogWithTitle from '../DialogWithTitle';

export const PopUpForIndystry = (props: IPopUpForIndystry) => (
  <DialogWithTitle
    show={props.show}
    setShow={props.setShow}
    title={props.id ? `Редактирование ${props.cardTitle}` : `Создание ${props.cardTitle}`}
    child={
      <Box component="form" noValidate onSubmit={props.handleSubmit}>
        {props.child?.component ? props.child.component : null}
        <Box sx={{display: 'flex'}}>
          <Box sx={{width: '335px'}}>
            <CardInputImage
              id={props.id}
              value={props.value[EType.cardImageUrl]}
              name={EType.cardImage}
              handleImageChange={props.handleImageChange}
            />
            <TextField
              autoFocus={true}
              name={EType.name}
              value={props.value[EType.name]}
              onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
              required
              error={props.valid === false}
              color={props.valid ? 'success' : 'primary'}
              placeholder={`Название ${props.cardTitle}...`}
              className="mb-3"
              sx={{width: '100%'}}
            />
          </Box>
          {!props.child ? (
            <CardInputImage
              id={props.id}
              value={props.value[EType.sliderImageUrl]}
              name={EType.sliderImage}
              handleImageChange={props.handleImageChange}
              sx={{flexGrow: 1, ml: '30px'}}
            />
          ) : null}
        </Box>
        <Box>
          <CardInputImage
            id={props.id}
            value={props.value[EType.headerImageUrl]}
            name={EType.headerImage}
            handleImageChange={props.handleImageChange}
          />
          <TextField
            name={EType.title}
            value={props.value[EType.title]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
            placeholder="Заголовок индустрии"
            sx={{width: '100%', mt: '30px'}}
          />
        </Box>
        <AddTextField
          paragraphs={props.paragraphs}
          setParagraphs={props.setParagraphs}
          title={'Добавить абзац'}
          placeholder={'Параграф индустрии'}
        />
        <ContainerWithTwoColumns
          firstColumn={
            <CardInputImage
              id={props.id}
              value={props.value[EType.infoImageUrl]}
              name={EType.infoImage}
              handleImageChange={props.handleImageChange}
            />
          }
          secondColumn={
            <>
              <TextField
                name={EType.infoTitle}
                value={props.value[EType.infoTitle]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
                placeholder="Заголовок"
                sx={{width: '100%', mt: '30px'}}
              />
              <TextField
                name={EType.infoHeader}
                value={props.value[EType.infoHeader]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
                placeholder="Подзаголовок"
                sx={{width: '100%', mt: '30px'}}
              />
              <TextField
                name={EType.infoListTitle}
                multiline
                rows={4}
                value={props.value[EType.infoListTitle]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
                placeholder="Заголовок списка"
                sx={{width: '100%', mt: '30px'}}
              />
              <AddTextField
                paragraphs={props.infoListItems}
                setParagraphs={props.setInfoListItems}
                title={'Добавить пункт'}
                placeholder={'Пункт списка'}
              />
              <AddTextField
                paragraphs={props.infoParagraphs}
                setParagraphs={props.setInfoParagraphs}
                title={'Добавить параграф'}
                placeholder={'Параграф'}
              />
            </>
          }
        />
        <AddOpinion
          titleName={EType.opinionTitle}
          titleValue={props.value[EType.opinionTitle]}
          handleChange={props.handleChange}
          opinionParagraphs={props.opinionParagraphs}
          setOpinionParagraphs={props.setOpinionParagraphs}
          listTitleName={EType.opinionListTitle}
          listTitleValue={props.value[EType.opinionListTitle]}
          opinionListItems={props.opinionListItems}
          setOpinionListItems={props.setOpinionListItems}
          image={{
            id: props.id,
            image: props.value[EType.opinionImageUrl],
            name: EType.opinionImage,
            handleImageChange: props.handleImageChange,
          }}
          nameName={EType.opinionName}
          nameValue={props.value[EType.opinionName]}
          phoneName={EType.opinionPhone}
          phoneValue={props.value[EType.opinionPhone]}
          faxName={EType.opinionFax}
          faxValue={props.value[EType.opinionFax]}
          emailName={EType.opinionEmail}
          emailValue={props.value[EType.opinionEmail]}
        />
        <DialogActions>
          <Button type="submit" variant="outlined">
            Сохранить
          </Button>
        </DialogActions>
      </Box>
    }
  />
);

export default PopUpForIndystry;
