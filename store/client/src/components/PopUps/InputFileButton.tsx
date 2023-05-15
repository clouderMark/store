import {ChangeEvent} from 'react';
import {Button} from '@mui/material';

interface IProps {
  handleImageChange(event: ChangeEvent<HTMLInputElement>): void;
  name: string;
  id: number | null;
}

const InputFileButton = (props: IProps) => {
  const {id, name, handleImageChange} = props;

  return (
    <Button
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      aria-label="upload picture"
      component="label"
      color="first"
      variant="contained"
    >
      <input
        name={name}
        type="file"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleImageChange(e)}
        placeholder="Фото ..."
        hidden
        accept="image/*"
        aria-label="upload picture"
      />
      {`${id ? 'Изменить' : 'Добавить'} фото`}
    </Button>
  );
};

export default InputFileButton;
