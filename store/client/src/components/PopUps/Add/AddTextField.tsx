import {Dispatch, SetStateAction} from 'react';
import uuid from 'react-uuid';
import {Box, IconButton, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {IParagraphs} from '../../../types/types';
import TextFieldWithIcon from './TextFieldWithIcon';

interface IProps {
  paragraphs: IParagraphs[];
  setParagraphs: Dispatch<SetStateAction<IParagraphs[]>>;
  title: string;
  placeholder: string;
}

const AddTextField = (props: IProps) => {
  const {paragraphs, setParagraphs, title, placeholder} = props;
  const append = () => {
    setParagraphs([...paragraphs, {id: null, value: '', unique: uuid()}]);
  };

  const remove = (unique: string) => {
    setParagraphs(paragraphs.filter((elem) => elem.unique !== unique));
  };

  const change = (value: string, unique: string) => {
    setParagraphs(paragraphs.map((item) => (item.unique === unique ? {...item, value} : item)));
  };

  return (
    <>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '30px'}}>
        <Typography component="span">{title}</Typography>
        <IconButton color="secondary" aria-label="add" onClick={append}>
          <AddIcon />
        </IconButton>
      </Box>
      {paragraphs.map((item) => (
        <TextFieldWithIcon item={{...item, placeholder, onChange: change, remove}} key={item.unique} />
      ))}
    </>
  );
};

export default AddTextField;
