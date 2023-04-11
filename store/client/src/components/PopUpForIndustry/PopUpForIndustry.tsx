import React, {ChangeEvent} from 'react';
import {Dialog, DialogContent, DialogTitle, Box, TextField, DialogActions, Button} from '@mui/material';
import {popUpForIndystry as styles} from './styles/popUpForIndystry';
import InputFileButton from './InputFileButton';
import BranchItem from './BranchItem';
import {IPopUpForIndystry} from './types/IPopUpForIndystry';

export const PopUpForIndystry = (props: IPopUpForIndystry) => (
  <Dialog open={props.show} onClose={() => props.setShow(false)} PaperProps={{sx: {width: '60%', minWidth: '1000px'}}}>
    <DialogTitle>
      {props.id ? 'Редактирование' : 'Создание'} {props.cardTitle}
    </DialogTitle>

    <DialogContent>
      <Box component="form" noValidate onSubmit={props.handleSubmit}>
        {props.child?.component ? props.child.component : null}
        <Box sx={styles.box}>
          <Box sx={styles.card}>
            <Box sx={styles.img} component="img" src={props.cardImage ? props.cardImage : ''} />
            <InputFileButton
              styles={styles.card.button}
              id={props.id}
              name="cardImage"
              handleImageChange={props.handleImageChange}
            />
          </Box>
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
            sx={styles.name}
          />
        </Box>
        <BranchItem
          handleImageChange={props.handleImageChange}
          headerImage={props.headerImage}
          id={props.id}
          title={props.title}
          handleChange={props.handleChange}
          paragraphs={props.paragraphs}
          setParagraphs={props.setParagraphs}
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
