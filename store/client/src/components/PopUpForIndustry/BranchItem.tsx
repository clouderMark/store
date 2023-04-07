import {ChangeEvent, Dispatch, SetStateAction} from 'react';
import uuid from 'react-uuid';
import {Box, TextField, IconButton, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import InputFileButton from './InputFileButton';
import {popUpForIndystry as styles} from './styles/popUpForIndystry';
import {IParagraphs} from '../../types/types';

interface IProps {
  handleImageChange(event: ChangeEvent<HTMLInputElement>): void;
  headerImage: string | null;
  id: number | null;
  title: string;
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
  paragraphs: IParagraphs[];
  setParagraphs: Dispatch<SetStateAction<IParagraphs[]>>;
}

const BranchItem = (props: IProps) => {
  const {paragraphs, setParagraphs} = props;
  const append = () => {
    setParagraphs([...paragraphs, {id: null, value: '', unique: uuid(), append: true}]);
  };

  const remove = (unique: string) => {
    const item = paragraphs.find((elem) => elem.unique === unique);

    if (item?.id) {
      // старая хар-ка
      setParagraphs(paragraphs.map((elem) => (elem.unique === unique ? {...elem, change: false, remove: true} : elem)));
    } else {
      // новая хар-ка
      setParagraphs(paragraphs.filter((elem) => elem.unique === unique));
    }
  };

  const change = (key: string, value: string, unique: string) => {
    setParagraphs(
      paragraphs.map((item) => (item.unique === unique ? {...item, [key]: value, change: !item.append} : item)),
    );
  };

  return (
    <>
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
      <TextField
        name="title"
        value={props.title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
        placeholder="Заголовок индустрии"
        sx={{width: '100%', mt: '30px'}}
      />
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '30px'}}>
        <Typography component="span">Добавить абзац</Typography>
        <IconButton color="secondary" aria-label="add" onClick={append}>
          <AddIcon />
        </IconButton>
      </Box>
      {paragraphs.map((item) => (
        <Box key={item.unique} sx={{display: 'flex', alignItems: 'flex-start', mt: '30px'}}>
          <TextField
            name={`value_${item.unique}`}
            // value={props.paragraph}
            value={item.value}
            onChange={(e) => change('value', e.target.value, item.unique)}
            multiline
            rows={4}
            placeholder="Параграф индустрии"
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

export default BranchItem;
