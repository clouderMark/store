import {ChangeEvent} from 'react';
import {Box} from '@mui/material';
import {cardInputImage as styles} from './styles/cardInputImage';
import InputFileButton from '../InputFileButton';

interface IProps {
  value: string | null;
  name: string;
  handleImageChange(event: ChangeEvent<HTMLInputElement>): void;
  sx?: any; // eslint-disable-line
}

const CardInputImage = (props: IProps) => {
  const {value, handleImageChange, name} = props;

  return (
    <Box sx={[styles.card, props.sx]}>
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
