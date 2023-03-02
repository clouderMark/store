import {Dispatch, SetStateAction, FormEvent, ChangeEvent} from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  DialogTitle,
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
import EditProperties from './EditProperties';
import {IDefaultValue, IDefaultValid, IValid, ICatalogItem, IProductProp} from '../types/types';

interface IProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  handleSubmit(event: FormEvent<HTMLFormElement>): void;
  handleInputChange(event: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement>): void;
  handleImageChange(event: ChangeEvent<HTMLInputElement>): void;
  title: 'Новый товар' | 'Редактирование товара';
  value: IDefaultValue;
  valid: IDefaultValid | IValid;
  categories: ICatalogItem[] | null;
  brands: ICatalogItem[] | null;
  areas: ICatalogItem[] | null;
  properties: IProductProp[];
  setProperties: Dispatch<SetStateAction<IProductProp[]>>;
}

export const PopUpForProduct = (props: IProps) => (
  <Dialog open={props.show} onClose={() => props.setShow(false)} PaperProps={{sx: {width: '30%', minWidth: '500px'}}}>
    <DialogTitle>{props.title}</DialogTitle>

    <DialogContent>
      <Box noValidate onSubmit={props.handleSubmit} component="form">
        <TextField
          name="name"
          value={props.value.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleInputChange(e)}
          error={props.valid.name === false}
          color={props.valid.name ? 'success' : 'primary'}
          placeholder="Название товара..."
          sx={{width: '100%', mb: 3}}
        />
        <Box className="mb-3" sx={{display: 'flex'}}>
          <FormControl sx={{width: '100%', mr: 1}}>
            <InputLabel id="category-select-label">Категория</InputLabel>
            <Select
              labelId="category-select-label"
              name="category"
              value={props.value.category}
              onChange={(e) => props.handleInputChange(e)}
              error={props.valid.category === false}
              color={props.valid.category ? 'success' : 'primary'}
            >
              {props.categories &&
                props.categories.map((item) => (
                  <MenuItem key={item.id} value={`${item.id}`}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl sx={{width: '100%', mr: 1}}>
            <InputLabel id="brand-select-label">Бренд</InputLabel>
            <Select
              labelId="brand-select-label"
              name="brand"
              value={`${props.value.brand}` ?? ''}
              onChange={(e) => props.handleInputChange(e)}
              error={props.valid.brand === false}
              color={props.valid.brand ? 'success' : 'primary'}
            >
              {props.brands &&
                props.brands.map((item) => (
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
              value={`${props.value.area}` ?? ''}
              onChange={(e) => props.handleInputChange(e)}
              error={props.valid.area === false}
              color={props.valid.area ? 'success' : 'primary'}
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
            name="price"
            value={props.value.price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleInputChange(e)}
            color={props.valid.price ? 'success' : 'primary'}
            error={props.valid.price === false}
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
    </DialogContent>
  </Dialog>
);
