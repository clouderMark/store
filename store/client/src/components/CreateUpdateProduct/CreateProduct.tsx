import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';
import {SelectChangeEvent} from '@mui/material';
import {PopUpForProduct} from '../PopUpForProduct';
import {createProduct, fetchBrands, fetchIndustries, fetchAreas} from '../../http/catalogAPI';
import {ICatalogItem, IValid, IDefaultValid, IProductProp} from '../../types/types';
import {IProps} from './types';
import {defaultValue, defaultValid} from './default';
import {isValid} from './isValid';

const CreateProduct = (props: IProps) => {
  const {show, setShow, setChange} = props;

  const [value, setValue] = useState(defaultValue);
  const [valid, setValid] = useState<IDefaultValid | IValid>(defaultValid);

  // выбранное для загрузки изображение товара
  const [image, setImage] = useState<File | null>(null); //

  // список характеристик товара
  const [properties, setProperties] = useState<IProductProp[]>([]);

  // список индустрий и список брендов для возможности выбора
  const [industries, setIndustries] = useState<ICatalogItem[] | null>(null);
  const [brands, setBrands] = useState<ICatalogItem[] | null>(null);
  const [areas, setAreas] = useState<ICatalogItem[] | null>(null);

  // получить с сервера список индустрий и брендов
  useEffect(() => {
    fetchIndustries().then((data) => setIndustries(data));
    fetchBrands().then((data) => setBrands(data));
    fetchAreas().then((data) => setAreas(data));
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
    if (
      correct.name &&
      correct.price &&
      correct.industry &&
      correct.brand &&
      correct.area &&
      correct.article &&
      correct.weight
    ) {
      const data = new FormData();

      data.append('name', value.name.trim());
      data.append('price', value.price.trim());
      data.append('industryId', value.industry);
      data.append('brandId', value.brand);
      data.append('areaId', value.area);
      data.append('article', value.article.trim());
      data.append('weight', value.weight.trim());
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
    <PopUpForProduct
      show={show}
      setShow={setShow}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      handleImageChange={handleImageChange}
      title={'Новый товар'}
      value={value}
      valid={valid}
      industries={industries}
      brands={brands}
      areas={areas}
      properties={properties}
      setProperties={setProperties}
    />
  );
};

export default CreateProduct;
