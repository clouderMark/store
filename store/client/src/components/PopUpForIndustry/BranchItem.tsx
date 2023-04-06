import {ChangeEvent} from 'react';
import {Box} from '@mui/material';
import InputFileButton from './InputFileButton';
import {popUpForIndystry as styles} from './styles/popUpForIndystry';

interface IProps {
  handleImageChange(event: ChangeEvent<HTMLInputElement>): void;
  headerImage: string | null;
  id: number | null;
}

const BranchItem = (props: IProps) => (
  <Box sx={styles.card}>
    <Box
      component="img"
      src={props.headerImage ? props.headerImage : ''}
      sx={[styles.headerImage, {backgroundColor: '#707070', backgroundSize: 'cover'}]}
    />
    <InputFileButton
      styles={styles.card.button}
      id={props.id}
      name="headerImage"
      handleImageChange={props.handleImageChange}
    />
  </Box>
);

export default BranchItem;
