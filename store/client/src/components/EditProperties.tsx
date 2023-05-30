import {Dispatch, SetStateAction} from 'react';
import uuid from 'react-uuid';
import {Box, IconButton, Typography, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {IProductProp} from '../types/types';

interface IProps {
  properties: IProductProp[];
  setProperties: Dispatch<SetStateAction<IProductProp[]>>;
}

const EditProperties = (props: IProps) => {
  const {properties, setProperties} = props;

  const append = () => {
    setProperties([...properties, {id: null, name: '', value: '', unique: uuid(), append: true}]);
  };

  const remove = (unique: string) => {
    // новую хар-ку нужно просто удалить из массива properties , а старую - оставить
    // , но изменить remove на true, чтобы потом выполнить http запрос на сервер для удаления
    const item = properties.find((elem) => elem.unique === unique);

    if (item?.id) {
      // старая хар-ка
      setProperties(properties.map((elem) => (elem.unique === unique ? {...elem, change: false, remove: true} : elem)));
    } else {
      // новая хар-ка
      setProperties(properties.filter((elem) => elem.unique !== unique));
    }
  };

  const change = (key: string, value: string, unique: string) => {
    setProperties(
      properties.map((item) => (item.unique === unique ? {...item, [key]: value, change: !item.append} : item)),
    );
  };

  return (
    <>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="subtitle1" component="h5">
          Характеристики
        </Typography>
        <IconButton onClick={append} color="secondary" aria-label="add">
          <AddIcon />
        </IconButton>
      </Box>
      {properties.map((item) => (
        <Box key={item.unique} sx={{display: item.remove ? 'none' : 'flex', mb: 2}}>
          <TextField
            name={`name_${item.unique}`}
            value={item.name}
            onChange={(e) => change('name', e.target.value, item.unique)}
            placeholder="Название..."
            sx={{mr: 1, width: '100%'}}
            size='small'
          />
          <TextField
            name={`value_${item.unique}`}
            value={item.value}
            onChange={(e) => change('value', e.target.value, item.unique)}
            placeholder="Значение..."
            sx={{width: '100%'}}
            size='small'
          />
          <IconButton
            color="warning"
            aria-label="delete"
            onClick={() => remove(item.unique)}
          >
            <DeleteIcon />
          </IconButton>
          {item.change && ' *'}
        </Box>
      ))}
    </>
  );
};

export default EditProperties;
