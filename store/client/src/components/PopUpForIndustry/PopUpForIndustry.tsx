import React, {ChangeEvent} from 'react';
import {Dialog, DialogContent, DialogTitle, Box, DialogActions, Button, TextField} from '@mui/material';
import {IPopUpForIndystry} from './types/IPopUpForIndystry';
import AddTextField from './AddTextField';
import ContainerWithTwoColumns from '../ContainerWithTwoColumns/ContainerWithTwoColumns';
import CardInputImage from './CardInputImage';
import {EType} from '../EditIndustry/EType';

export const PopUpForIndystry = (props: IPopUpForIndystry) => (
  <Dialog open={props.show} onClose={() => props.setShow(false)} PaperProps={{sx: {minWidth: '94%'}}}>
    <DialogTitle>
      {props.id ? 'Редактирование' : 'Создание'} {props.cardTitle}
    </DialogTitle>

    <DialogContent>
      <Box component="form" noValidate onSubmit={props.handleSubmit}>
        {props.child?.component ? props.child.component : null}
        <Box sx={{width: '335px'}}>
          <CardInputImage
            id={props.id}
            image={props.value[EType.cardImageUrl]}
            imageInputName={EType.cardImage}
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
        <Box>
          <CardInputImage
            id={props.id}
            image={props.value[EType.headerImageUrl]}
            imageInputName={EType.headerImage}
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
          listItem={'Параграф индустрии'}
        />
        <ContainerWithTwoColumns
          firstColumn={
            <CardInputImage
              id={props.id}
              image={props.value[EType.infoImageUrl]}
              imageInputName={EType.infoImage}
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
                listItem={'Пункт списка'}
              />
              <AddTextField
                paragraphs={props.infoParagraphs}
                setParagraphs={props.setInfoParagraphs}
                title={'Добавить параграф'}
                listItem={'Параграф'}
              />
            </>
          }
        />
        <ContainerWithTwoColumns
          firstColumn={
            <>
              <TextField
                name={EType.opinionTitle}
                value={props.value[EType.opinionTitle]}
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
                name={EType.opinionListTitle}
                value={props.value[EType.opinionListTitle]}
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
                id={props.id}
                image={props.value[EType.opinionImageUrl]}
                imageInputName={EType.opinionImage}
                handleImageChange={props.handleImageChange}
              />
              <TextField
                name={EType.opinionName}
                value={props.value[EType.opinionName]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
                placeholder="Имя"
                sx={{width: '100%', mt: '30px'}}
              />
              <TextField
                name={EType.opinionPhone}
                value={props.value[EType.opinionPhone]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
                placeholder="Телефон"
                sx={{width: '100%', mt: '30px'}}
              />
              <TextField
                name={EType.opinionFax}
                value={props.value[EType.opinionFax]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
                placeholder="Факс"
                sx={{width: '100%', mt: '30px'}}
              />
              <TextField
                name={EType.opinionEmail}
                value={props.value[EType.opinionEmail]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
                placeholder="E-mail"
                sx={{width: '100%', mt: '30px'}}
              />
            </>
          }
          firstColumnWidth={70}
        />
        <DialogActions>
          <Button type="submit" variant="outlined">
            Сохранить
          </Button>
        </DialogActions>
      </Box>
    </DialogContent>
  </Dialog>
);

export default PopUpForIndystry;
