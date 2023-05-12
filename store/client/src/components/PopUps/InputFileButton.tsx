import {ChangeEvent} from 'react';
import {Button} from '@mui/material';

interface IProps {
  handleImageChange(event: ChangeEvent<HTMLInputElement>): void;
  // eslint-disable-next-line
  sx: any;
  name: string;
  id: number | null;
}

const InputFileButton = (props: IProps) => {
  const {id, sx, name, handleImageChange} = props;

  return (
    <Button sx={sx} aria-label="upload picture" component="label" color="first" variant="contained">
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
