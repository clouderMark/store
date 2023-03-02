import React, {Dispatch, SetStateAction, useEffect, useState, ChangeEvent, FormEvent} from 'react';
import uuid from 'react-uuid';
import {SelectChangeEvent} from '@mui/material';
import {
  createProperty,
  deleteProperty,
  fetchBrands,
  fetchCategories,
  fetchOneProduct,
  fetchAreas,
  updateProduct,
  updateProperty,
} from '../http/catalogAPI';
import {PopUpForProduct} from './PopUpForProduct';
import {IDefaultValue, IDefaultValid, IValid, IProductProp, ICatalogItem} from '../types/types';

interface IProps {
  id: number;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setChange: Dispatch<SetStateAction<boolean>>;
}

const defaultValue: IDefaultValue = {name: '', price: '', category: '', brand: '', area: ''};
const defaultValid: IDefaultValid = {name: null, price: null, category: null, brand: null, area: null};

const isValid = (value: IDefaultValue): IValid => {
  const result = {} as IValid;
  const pattern = /^[1-9][0-9]*$/;

  for (const key in value) {
    if (key) {
      if (key === 'name') result.name = value.name.trim() !== '';
      if (key === 'price') result.price = pattern.test(value.price.trim());
      if (key === 'category') result.category = pattern.test(value.category);
      if (key === 'brand') result.brand = pattern.test(value.brand);
      if (key === 'area') result.area = pattern.test(value.area);
    }
  }

  return result;
};

const updateProperties = async (properties: IProductProp[], productId: number) => {
  for (const prop of properties) {
    const empty = prop.name.trim() === '' || prop.value.trim() === '';
    // если характеристика пуста - удалю ее на сервере

    if (empty && prop.id) {
      try {
        await deleteProperty(productId, prop.id);
      } catch (error) {
        console.error(error);
      }

      continue;
    }
    /*
     *Если у объекта prop свойство append равно true - это новая хар-ка, ее нужно создать
     *Если у объекта prop свойство change равно true - хар-ка изменилась, ее нужно обновить
     *Если у объекта prop свойство remove равно true - хар-ку удалили, ее нужно удалить
     */

    if (prop.append && !empty) {
      try {
        await createProperty(productId, prop);
      } catch (error) {
        console.error(error);
      }

      continue;
    }

    if (prop.change && !prop.remove) {
      try {
        await updateProperty(productId, prop.id!, prop);
      } catch (error) {
        console.error(error);
      }

      continue;
    }

    if (prop.remove) {
      try {
        await deleteProperty(productId, prop.id!);
      } catch (error) {
        console.error(error);
      }

      continue;
    }
  }
};

const UpdateProduct = (props: IProps) => {
  const {id, show, setShow, setChange} = props;

  const [value, setValue] = useState(defaultValue);
  const [valid, setValid] = useState<IDefaultValid | IValid>(defaultValid);

  // выбранное для загрузки изображение товара
  const [image, setImage] = useState<File | null>(null);

  // список характеристик товара
  const [properties, setProperties] = useState<IProductProp[]>([]);

  // список категорий и список брендов для возможности выбора
  const [categories, setCategories] = useState<ICatalogItem[] | null>(null);
  const [brands, setBrands] = useState<ICatalogItem[] | null>(null);
  const [areas, setAreas] = useState<ICatalogItem[] | null>(null);

  const [fetchingProduct, setfetchingProduct] = useState(true);
  const [fetchingCategories, setfetchingCategories] = useState(true);
  const [fetchingBrands, setfetchingBrands] = useState(true);
  const [fetchingAreas, setfetchingAreas] = useState(true);

  useEffect(() => {
    if (id) {
      // нужно получить с сервера данные товара для редактирования
      fetchOneProduct(id)
        .then((data) => {
          const prod = {
            name: data.name,
            price: data.price.toString(),
            category: data.categoryId.toString(),
            brand: data.brandId.toString(),
            area: data.areaId.toString(),
          };

          setValue(prod);
          setValid(isValid(prod));
          setProperties(
            data.props.map((item) =>
              // при добавлении новой хар-ки свойство append принимает значение true
              // при изменении старой хар-ки свойство change принимает значение true
              // при удалении старой хар-ки свойство remove принимает значение true
              ({...item, unique: uuid(), append: false, remove: false, change: false})),
          );
        })
        .catch((error) => console.error(error))
        .finally(() => setfetchingProduct(false));
      // нужно получить с сервера список категорий и всех брендов
      fetchCategories().then((data) => setCategories(data))
        .finally(() => setfetchingCategories(false));
      fetchBrands().then((data) => setBrands(data))
        .finally(() => setfetchingBrands(false));
      fetchAreas().then((data) => setAreas(data))
        .finally(() => setfetchingAreas(false));
    }
  }, [id]);

  const handleInputChange = (event: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement>) => {
    const data = {...value, [event.target.name]: event.target.value};

    setValue(data);
    setValid(isValid(data));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const correct = isValid(value);

    setValid(correct);

    // если прошли проверку то можно отправлять на сервер
    if (correct.name && correct.price && correct.category && correct.brand && correct.area) {
      const data = new FormData();

      data.append('name', value.name.trim());
      data.append('price', value.price.trim());
      data.append('categoryId', value.category);
      data.append('brandId', value.brand);
      data.append('areaId', value.area);
      if (image) data.append('image', image, image.name);

      // нужно обновить, добавить или удалить хар-ку и обязательно дождаться ответа
      // сервера - поэтому ф-ция updateProperties() объявлена как async, а в теле
      // ф-ции для выполнение действия с каждой хар-кой используется await
      if (properties.length) {
        await updateProperties(properties, id);
      }

      updateProduct(id, data)
        .then((data) => {
          // сбрасываю поле загрузки изображения, чтобы при сохранении товара,
          // когда новое изображение не выбрано, не загружать старое повторно
          setImage(null);
          // event.target.image.value = '';
          // в принципе мы могли бы сбросить все поля формы на дефолтные значения,
          // но если пользователь решит отредактировать тот же товар повторно, то
          // увидит пустые поля формы - http-запрос на получение данных для редактирования
          // мы выполняем только тогда, когда выбран новый товар (изминился id товара)
          const prod = {
            name: data.name,
            price: data.price.toString(),
            category: data.categoryId.toString(),
            brand: data.brandId.toString(),
            area: data.areaId.toString(),
          };

          setValue(prod);
          setValid(isValid(prod));
          // мы получили актуальные значения хар-к с сервера, потому что обновление
          // хар-тик завершилось еще до момента отправки этого http-запроса на сервер
          setProperties(
            data.props.map((item) => ({...item, unique: uuid(), append: false, remove: false, change: false})),
          );
          // закрываю модально окно редактирования товара
          setShow(false);
          // изменяем состояние компонента списка товаров
          setChange((state) => !state);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <PopUpForProduct
      show={show && !fetchingProduct && !fetchingBrands && !fetchingCategories && !fetchingAreas}
      setShow={setShow}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      handleImageChange={handleImageChange}
      title={'Редактирование товара'}
      value={value}
      valid={valid}
      categories={categories}
      brands={brands}
      areas={areas}
      properties={properties}
      setProperties={setProperties}
    />
  );
};

export default UpdateProduct;
