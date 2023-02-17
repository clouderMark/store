import React, {useEffect, useState, Dispatch, SetStateAction, ChangeEvent, FormEvent, useRef} from 'react';
// import {Form} from 'react-bootstrap';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import {createCategory, fetchCategory, updateCategory} from '../http/catalogAPI';

interface IProps {
  id: number | null;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setChange: Dispatch<SetStateAction<boolean>>;
}

const EditCategory = (props: IProps) => {
  const {id, show, setShow, setChange} = props;

  const [name, setName] = useState('');
  const [valid, setValid] = useState<null | boolean>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  if (show) {
    if (inputRef && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  useEffect(() => {
    if (id) {
      fetchCategory(id)
        .then((data) => {
          setName(data.name);
          setValid(data.name !== '');
        })
        .catch((error) => console.log(error));
    } else {
      setName('');
      setValid(null);
    }
  }, [id]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setValid(event.target.value.trim() !== '');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const correct = name.trim() !== '';

    setValid(correct);
    if (correct) {
      const data = {
        name: name.trim(),
      };
      const success = () => {
        // закрываем модальное окно
        setShow(false);
        // изменяю состояние родителя, чтобы обновить список категорий
        setChange((state) => !state);
      };

      if (id) {
        updateCategory(id, data)
          .then(success)
          .catch((error) => console.error(error));
      } else {
        createCategory(data)
          .then(success)
          .catch((error) => console.error(error));
      }
    }
  };

  return (
    <Dialog
      open={show}
      onClose={() => setShow(false)}
      PaperProps={{sx: {width: '30%', minWidth: '500px'}}}>
      <DialogTitle>{id ? 'Редактирование' : 'Создание'} категории</DialogTitle>

      <DialogContent>
        <Box component='form' noValidate onSubmit={handleSubmit}>
          <TextField
            autoFocus={true}
            inputRef={inputRef}
            name="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            required
            error={valid === false}
            color={valid ? 'success' : 'primary'}
            placeholder="Название категории..."
            className="mb-3"
            sx={{width: '100%'}}
          />
          <DialogActions>
            <Button type="submit" variant="outlined">Сохранить</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
