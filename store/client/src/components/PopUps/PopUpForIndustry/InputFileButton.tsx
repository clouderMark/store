import {ChangeEvent} from 'react';
import {Button} from '@mui/material';

interface IProps {
  handleImageChange(event: ChangeEvent<HTMLInputElement>): void;
  // eslint-disable-next-line
  styles: any;
  name: string;
  id: number | null;
}

const InputFileButton = (props: IProps) => (
  <Button sx={props.styles} aria-label="upload picture" component="label" color="first" variant="contained">
    <input
      name={props.name}
      type="file"
      onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleImageChange(e)}
      placeholder="Фото ..."
      hidden
      accept="image/*"
      aria-label="upload picture"
    />
    {`${props.id ? 'Изменить' : 'Добавить'} фото`}
  </Button>
);

export default InputFileButton;
