import {Dispatch} from 'react';
import uuid from 'react-uuid';
import {Box, IconButton, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TextFieldWithIcon from './TextFieldWithIcon';
import {IParagraphs} from '../../../types/types';

interface IProps {
  title: string;
  placeholder: string;
  name: string;
  value: {[key: string]: any} // eslint-disable-line
  dispatch: Dispatch<{type: string; payload?: any}>; // eslint-disable-line
}

const AddTextField = (props: IProps) => {
  const {title, placeholder, dispatch, name, value} = props;
  const items: IParagraphs[] = value[name];
  const append = () => {
    dispatch({type: name, payload: [...items, {id: null, value: '', unique: uuid()}]});
  };

  const remove = (unique: string) => {
    dispatch({type: name, payload: items.filter((elem) => elem.unique !== unique)});
  };

  const change = (value: string, unique: string) => {
    dispatch({type: name, payload: items.map((item) => (item.unique === unique ? {...item, value} : item))});
  };

  return (
    <>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '30px'}}>
        <Typography component="span">{title}</Typography>
        <IconButton color="secondary" aria-label="add" onClick={append}>
          <AddIcon />
        </IconButton>
      </Box>
      {items.map((item: IParagraphs) => (
        <TextFieldWithIcon item={{...item, placeholder, onChange: change, remove}} key={item.unique} />
      ))}
    </>
  );
};

export default AddTextField;
