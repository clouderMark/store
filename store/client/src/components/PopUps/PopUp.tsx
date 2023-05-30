import React, {ChangeEvent, Dispatch, SetStateAction, FormEvent} from 'react';
import {
  Box,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import DialogWithTitle from './DialogWithTitle';

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

const PopUp = (props: IProps) => {
  const {id, title, valid, name} = props;

  return (
    <DialogWithTitle
      show={props.show}
      setShow={props.setShow}
      title={id ? `Редактирование ${title}` : `Создание ${title}`}
      child={
        <Box component="form" noValidate onSubmit={props.handleSubmit}>
          <TextField
            autoFocus={true}
            inputRef={props.inputRef}
            name="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
            required
            error={valid === false}
            color={valid ? 'success' : 'primary'}
            placeholder={`Название ${title}...`}
            className="mb-3"
            sx={{width: '100%'}}
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
};

export default PopUp;
