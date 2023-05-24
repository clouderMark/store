import {ChangeEvent} from 'react';
import {Box} from '@mui/material';
import {cardInputImage as styles} from './styles/cardInputImage';
import InputFileButton from '../InputFileButton';

interface IProps {
  value: string | null;
  name: string;
  handleImageChange(event: ChangeEvent<HTMLInputElement>): void;
  sx?: any; // eslint-disable-line
  error?: boolean | null;
}

const CardInputImage = (props: IProps) => {
  const {value, handleImageChange, name} = props;
  let error;

  if (typeof props.error === 'boolean') {
    error = props.error;
  } else error = true;

  return (
    <Box sx={[styles.card, props.sx, !error ? {border: '1.5px solid red'} : {border: 0}]}>
      <Box sx={styles.img} component="img" src={value || ''} />
      <InputFileButton
        isValue={Boolean(value)}
        name={name}
        handleImageChange={handleImageChange}
      />
    </Box>
  );
};

export default CardInputImage;
