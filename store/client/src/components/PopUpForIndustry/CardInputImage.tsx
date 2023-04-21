import {ChangeEvent} from 'react';
import {Box} from '@mui/material';
import {popUpForIndystry as styles} from './styles/popUpForIndystry';
import InputFileButton from './InputFileButton';

interface IProps {
  id: number | null;
  image: string | null;
  imageInputName: string;
  handleImageChange(event: ChangeEvent<HTMLInputElement>): void;
  sx?: any; // eslint-disable-line
}

const CardInputImage = (props: IProps) => {
  const {id, image, handleImageChange, imageInputName} = props;

  return (
    <Box sx={[styles.card, props.sx]}>
      <Box sx={styles.img} component="img" src={image || ''} />
      <InputFileButton
        styles={styles.card.button}
        id={id}
        name={imageInputName}
        handleImageChange={handleImageChange}
      />
    </Box>
  );
};

export default CardInputImage;
