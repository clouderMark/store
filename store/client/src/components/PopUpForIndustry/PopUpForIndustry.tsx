import React, {ChangeEvent, Dispatch, SetStateAction, FormEvent} from 'react';
import {Dialog, DialogContent, DialogTitle, Box, TextField, DialogActions, Button} from '@mui/material';
import {popUpForIndystry as styles} from './styles/popUpForIndystry';

interface IProps {
  title: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  id: number | null;
  name: string;
  fetchedCardImage: string | null;
  handleImageChange(event: ChangeEvent<HTMLInputElement>): void;
  valid: boolean | null;
  inputRef: React.RefObject<HTMLInputElement>;
  handleSubmit(event: FormEvent<HTMLFormElement>): void;
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

export const PopUpForIndystry = (props: IProps) => (
  <Dialog open={props.show} onClose={() => props.setShow(false)} PaperProps={{sx: {width: '60%', minWidth: '1000px'}}}>
    <DialogTitle>
      {props.id ? 'Редактирование' : 'Создание'} {props.title}
    </DialogTitle>

    <DialogContent>
      <Box component="form" noValidate onSubmit={props.handleSubmit}>
        <Box sx={styles.box}>
          <Box sx={styles.card}>
            {props.fetchedCardImage ? (
              <Box sx={styles.card.img} component="img" src={process.env.REACT_APP_IMG_URL + props.fetchedCardImage} />
            ) : (
              <Box sx={styles.card.img} component="img" src="http://via.placeholder.com/335" />
            )}
            <Button
              sx={styles.card.button}
              aria-label="upload picture"
              component="label"
              color="first"
              variant="contained"
            >
              <input
                name="cardImage"
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleImageChange(e)}
                placeholder="Фото товара..."
                hidden
                accept="image/*"
                aria-label="upload picture"
              />
              Изменить фото
            </Button>
          </Box>
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
            sx={styles.name}
          />
        </Box>
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
