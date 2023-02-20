import React, {useEffect, useState, Dispatch, SetStateAction, ChangeEvent, FormEvent} from 'react';
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
  SelectChangeEvent,
  IconButton,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CreateIcon from '@mui/icons-material/Create';
import EditProperties from './EditProperties';
import {createProduct, fetchBrands, fetchCategories} from '../http/catalogAPI';
import {ICatalogItem, IDefaultValue, IValid, IDefaultValid, IProductProp} from '../types/types';

interface IProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setChange: Dispatch<SetStateAction<boolean>>;
}

const defaultValue: IDefaultValue = {name: '', price: '', category: '', brand: ''};
const defaultValid: IDefaultValid = {name: null, price: null, category: null, brand: null};

const isValid = (value: IDefaultValue): IValid => {
  const result = {} as IValid;
  const pattern = /^[1-9][0-9]*$/;

  for (const key in value) {
    if (key) {
      if (key === 'name') result.name = value.name.trim() !== '';
      if (key === 'price') result.price = pattern.test(value.price.trim());
      if (key === 'category') result.category = pattern.test(value.category);
      if (key === 'brand') result.brand = pattern.test(value.brand);
    }
  }

  return result;
};

const CreateProduct = (props: IProps) => {
  const {show, setShow, setChange} = props;

  const [value, setValue] = useState(defaultValue);
  const [valid, setValid] = useState<IDefaultValid | IValid>(defaultValid);

  // выбранное для загрузки изображение товара
  const [image, setImage] = useState<File | null>(null); //

  // список характеристик товара
  const [properties, setProperties] = useState<IProductProp[]>([]);

  // список категорий и список брендов для возможности выбора
  const [categories, setCategories] = useState<ICatalogItem[] | null>(null);
  const [brands, setBrands] = useState<ICatalogItem[] | null>(null);

  // получить с сервера список категой и брендов
  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
    fetchBrands().then((data) => setBrands(data));
  }, []);

  const handleInputChange = (event: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement>) => {
    const data = {...value, [event.target.name]: event.target.value};

    setValue(data);
    setValid(isValid(data));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    //
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const correct = isValid(value);

    setValid(correct);

    // все поля прошли проверку отправляю данные на сервер
    if (correct.name && correct.price && correct.category && correct.brand) {
      const data = new FormData();

      data.append('name', value.name.trim());
      data.append('price', value.price.trim());
      data.append('categoryId', value.category);
      data.append('brandId', value.brand);
      if (image) data.append('image', image, image.name); //
      // характеристика нового товара
      if (properties.length) {
        const props = properties.filter((prop) => prop.name.trim() !== '' && prop.value.trim() !== '');

        if (props.length) {
          data.append('props', JSON.stringify(props));
        }
      }

      createProduct(data)
        .then(() => {
          // привожу форму в изначальное состояние
          setImage(null);
          // event.target.image.value = ''; //
          setValue(defaultValue);
          setValid(defaultValid);
          setProperties([]);
          // закрыть модальное окно
          setShow(false);
          // изменить состояние компонента товаров, чтобы в этом списке появился и новый товар
          setChange((state) => !state);
        })
        .catch((error) => alert(error));
    }
  };

  return (
    <Dialog open={show} onClose={() => setShow(false)} PaperProps={{sx: {width: '30%', minWidth: '500px'}}}>
      <DialogTitle>Новый товар</DialogTitle>

      <DialogContent>
        <Box noValidate onSubmit={handleSubmit} component="form">
          <TextField
            name="name"
            value={value.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            error={valid.name === false}
            color={valid.name ? 'success' : 'primary'}
            placeholder="Название товара..."
            className="mb-3"
            sx={{width: '100%'}}
          />
          <Box className="mb-3" sx={{display: 'flex'}}>
            <FormControl sx={{width: '100%', mr: 1}}>
              <InputLabel id="category-select-label">Категория</InputLabel>
              <Select
                labelId="category-select-label"
                name="category"
                value={value.category}
                onChange={(e) => handleInputChange(e)}
                error={valid.category === false}
                color={valid.category ? 'success' : 'primary'}
              >
                {categories &&
                  categories.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
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
                value={value.brand}
                onChange={(e) => handleInputChange(e)}
                error={valid.brand === false}
                color={valid.brand ? 'success' : 'primary'}
              >
                {brands &&
                  brands.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              name="price"
              value={value.price}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
              color={valid.price ? 'success' : 'primary'}
              error={valid.price === false}
              placeholder="Цена товара..."
              sx={{width: '100%', mr: 1}}
            />
            <IconButton color="primary" aria-label="upload picture" component="label" sx={{width: 55}}>
              <input
                name="image"
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleImageChange(e)}
                placeholder="Фото товара..."
                hidden
                accept="image/*"
                aria-label="upload picture"
              />
              <PhotoCamera />
            </IconButton>
          </Box>
          <EditProperties properties={properties} setProperties={setProperties} />
          <Box sx={{width: '100%'}}>
            <IconButton sx={{ml: 52}} type="submit" aria-label="save" color='success'>
              <CreateIcon/>
            </IconButton>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProduct;
