import {Box, IconButton, TextField} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface IProps {
  item: {
    value: string;
    placeholder: string;
    unique: string;
    onChange(value: string, unique: string): void;
    remove(unique: string): void;
  };
}

const TextFieldWithIcon = (props: IProps) => {
  const {item} = props;

  return (
    <Box sx={{display: 'flex', alignItems: 'flex-start', mt: '30px'}}>
      <TextField
        value={item.value}
        onChange={(e) => item.onChange(e.target.value, item.unique)}
        multiline
        rows={4}
        placeholder={item.placeholder}
        sx={{width: '100%'}}
      />
      <IconButton color="warning" aria-label="delete" onClick={() => item.remove(item.unique)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default TextFieldWithIcon;
