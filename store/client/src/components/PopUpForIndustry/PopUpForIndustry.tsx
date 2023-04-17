import React, {ChangeEvent} from 'react';
import {Dialog, DialogContent, DialogTitle, Box, DialogActions, Button, TextField} from '@mui/material';
import {IPopUpForIndystry} from './types/IPopUpForIndystry';
import AddTextField from './AddTextField';
import ContainerWithTwoColumns from '../ContainerWithTwoColumns/ContainerWithTwoColumns';
import CardInputImage from './CardInputImage';

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
            image={props.cardImage}
            imageInputName={'cardImage'}
            handleImageChange={props.handleImageChange}
          />
          <TextField
            autoFocus={true}
            name="name"
            value={props.name}
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
            image={props.headerImage}
            imageInputName={'headerImage'}
            handleImageChange={props.handleImageChange}
          />
          <TextField
            name="title"
            value={props.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
            placeholder="Заголовок индустрии"
            sx={{width: '100%', mt: '30px'}}
          />
        </Box>
        <AddTextField paragraphs={props.paragraphs} setParagraphs={props.setParagraphs} />
        <ContainerWithTwoColumns
          firstColumn={
            <CardInputImage
              id={props.id}
              image={props.infoImage}
              imageInputName={'infoImage'}
              handleImageChange={props.handleImageChange}
            />
          }
          secondColumn={<></>}
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
