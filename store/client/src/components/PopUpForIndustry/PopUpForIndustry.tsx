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
            image={props.value.cardImageUrl}
            imageInputName={EType.cardImage}
            handleImageChange={props.handleImageChange}
          />
          <TextField
            autoFocus={true}
            name={EType.name}
            value={props.value.name}
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
            image={props.value.headerImageUrl}
            imageInputName={EType.headerImage}
            handleImageChange={props.handleImageChange}
          />
          <TextField
            name={EType.title}
            value={props.value.title}
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
              image={props.value.infoImageUrl}
              imageInputName={EType.infoImage}
              handleImageChange={props.handleImageChange}
            />
          }
          secondColumn={
            <>
              <TextField
                name={EType.infoTitle}
                value={props.value.infoTitle}
                onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
                placeholder="Заголовок"
                sx={{width: '100%', mt: '30px'}}
              />
              <TextField
                name={EType.infoHeader}
                value={props.value.infoHeader}
                onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
                placeholder="Подзаголовок"
                sx={{width: '100%', mt: '30px'}}
              />
              <TextField
                name={EType.infoListTitle}
                multiline
                rows={4}
                value={props.value.infoListTitle}
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
