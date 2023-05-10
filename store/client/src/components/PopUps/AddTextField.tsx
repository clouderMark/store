import {Dispatch, SetStateAction} from 'react';
import uuid from 'react-uuid';
import {Box, TextField, IconButton, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {IParagraphs} from '../../types/types';

interface IProps {
  paragraphs: IParagraphs[];
  setParagraphs: Dispatch<SetStateAction<IParagraphs[]>>;
  title: string;
  listItem: string;
}

const AddTextField = (props: IProps) => {
  const {paragraphs, setParagraphs, title, listItem} = props;
  const append = () => {
    setParagraphs([...paragraphs, {id: null, value: '', unique: uuid()}]);
  };

  const remove = (unique: string) => {
    setParagraphs(paragraphs.filter((elem) => elem.unique !== unique));
  };

  const change = (key: string, value: string, unique: string) => {
    setParagraphs(paragraphs.map((item) => (item.unique === unique ? {...item, [key]: value} : item)));
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
        <Box key={item.unique} sx={{display: 'flex', alignItems: 'flex-start', mt: '30px'}}>
          <TextField
            name={`value_${item.unique}`}
            value={item.value}
            onChange={(e) => change('value', e.target.value, item.unique)}
            multiline
            rows={4}
            placeholder={listItem}
            sx={{width: '100%'}}
          />
          <IconButton color="warning" aria-label="delete" onClick={() => remove(item.unique)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </>
  );
};

export default AddTextField;
