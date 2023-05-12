import {Dispatch, SetStateAction, FormEvent, ChangeEvent} from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CreateIcon from '@mui/icons-material/Create';
import EditProperties from '../EditProperties';
import {IDefaultValue, IDefaultValid, IValid, ICatalogItem, IProductProp} from '../../types/types';
import DialogWithTitle from './DialogWithTitle';

interface IProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  handleSubmit(event: FormEvent<HTMLFormElement>): void;
  handleInputChange(event: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement>): void;
  handleImageChange(event: ChangeEvent<HTMLInputElement>): void;
  title: string;
  value: IDefaultValue;
  valid: IDefaultValid | IValid;
  industries: ICatalogItem[] | null;
  solutions: ICatalogItem[] | null;
  areas: ICatalogItem[] | null;
  properties: IProductProp[];
  setProperties: Dispatch<SetStateAction<IProductProp[]>>;
}

const PopUpForProduct = (props: IProps) => {
  const {value, valid, handleInputChange} = props;

  return (
    <DialogWithTitle
      show={props.show}
      setShow={props.setShow}
      title={props.title}
      child={
        <Box noValidate onSubmit={props.handleSubmit} component="form">
          <TextField
            name="name"
            value={value.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            error={valid.name === false}
            color={valid.name ? 'success' : 'primary'}
            placeholder="Название товара..."
            sx={{width: '100%', mb: 3}}
          />
          <Box className="mb-3" sx={{display: 'flex'}}>
            <FormControl sx={{width: '100%', mr: 1}}>
              <InputLabel id="industry-select-label">Индустрия</InputLabel>
              <Select
                labelId="industry-select-label"
                name="industry"
                value={value.industry}
                onChange={(e) => handleInputChange(e)}
                error={valid.industry === false}
                color={valid.industry ? 'success' : 'primary'}
              >
                {props.industries &&
                  props.industries.map((item) => (
                    <MenuItem key={item.id} value={`${item.id}`}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={{width: '100%', mr: 1}}>
              <InputLabel id="solution-select-label">Решение</InputLabel>
              <Select
                labelId="solution-select-label"
                name="solution"
                value={`${value.solution}` ?? ''}
                onChange={(e) => handleInputChange(e)}
                error={valid.solution === false}
                color={valid.solution ? 'success' : 'primary'}
              >
                {props.solutions &&
                  props.solutions.map((item) => (
                    <MenuItem key={item.id} value={`${item.id}`}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={{width: '100%', mr: 1}}>
              <InputLabel id="area-select-label">Продуктовое решение</InputLabel>
              <Select
                labelId="area-select-label"
                name="area"
                value={`${value.area}` ?? ''}
                onChange={(e) => handleInputChange(e)}
                error={valid.area === false}
                color={valid.area ? 'success' : 'primary'}
              >
                {props.areas &&
                  props.areas.map((item) => (
                    <MenuItem key={item.id} value={`${item.id}`}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              label="Арикул"
              name="article"
              value={value.article}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
              error={valid.article === false}
              color={valid.article ? 'success' : 'primary'}
              placeholder="Артикул товара..."
              sx={{width: '100%', mr: 1}}
            />
            <TextField
              label="Масса"
              name="weight"
              value={value.weight}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
              error={valid.weight === false}
              color={valid.weight ? 'success' : 'primary'}
              placeholder="Масса товара в кг..."
              sx={{width: '100%', mr: 1}}
            />
            <TextField
              label="Цена"
              name="price"
              value={value.price}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
              color={valid.price ? 'success' : 'primary'}
              error={valid.price === false}
              placeholder="Цена товара..."
              sx={{width: '100%'}}
            />
            <IconButton color="primary" aria-label="upload picture" component="label" sx={{width: 55}}>
              <input
                name="image"
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleImageChange(e)}
                placeholder="Фото товара..."
                hidden
                accept="image/*"
                aria-label="upload picture"
              />
              <PhotoCamera />
            </IconButton>
          </Box>
          <EditProperties properties={props.properties} setProperties={props.setProperties} />
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <IconButton sx={{ml: 'auto'}} type="submit" aria-label="save" color="success">
              <CreateIcon />
            </IconButton>
          </Box>
        </Box>
      }
    />
  );
};

export default PopUpForProduct;
