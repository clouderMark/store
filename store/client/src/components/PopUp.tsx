import React, {ChangeEvent, Dispatch, SetStateAction, FormEvent} from 'react';
import {Dialog, DialogContent, DialogTitle, Box, TextField, DialogActions, Button} from '@mui/material';

interface IProps {
  title: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  id: number | null;
  name: string;
  valid: boolean | null;
  inputRef: React.RefObject<HTMLInputElement>;
  handleSubmit(event: FormEvent<HTMLFormElement>): void;
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

export const PopUp = (props: IProps) => (
  <Dialog
    open={props.show}
    onClose={() => props.setShow(false)}
    PaperProps={{sx: {width: '30%', minWidth: '500px'}}}>
    <DialogTitle>{props.id ? 'Редактирование' : 'Создание'} {props.title}</DialogTitle>

    <DialogContent>
      <Box component="form" noValidate onSubmit={props.handleSubmit}>
        <TextField
          autoFocus={true}
          inputRef={props.inputRef}
          name="name"
          value={props.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
          required
          error={props.valid === false}
          color={props.valid ? 'success' : 'primary'}
          placeholder={`Название ${props.title}...`}
          className="mb-3"
          sx={{width: '100%'}}
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
