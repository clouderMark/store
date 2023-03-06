import {authInstance, guestInstance} from './index';
import {
  ICatalogItem,
  IProduct,
  IUpdatedProduct,
  IAllProducts,
  IProductWithProps,
  IRating,
  IProperty,
  IProductProp,
} from '../types/types';

// Создание, обновление, удаление категории, получение списка всех категой

export const createCategory = async (category: {name: string}): Promise<ICatalogItem> => {
  const {data} = await authInstance.post('category/create', category);

  return data;
};

export const updateCategory = async (id: number, category: {name: string}): Promise<ICatalogItem> => {
  const {data} = await authInstance.put(`category/update/${id}`, category);

  return data;
};

export const deleteCategory = async (id: number): Promise<ICatalogItem> => {
  const {data} = await authInstance.delete(`category/delete/${id}`);

  return data;
};

export const fetchCategories = async (): Promise<ICatalogItem[]> => {
  const {data} = await guestInstance.get('category/getall');

  return data;
};

export const fetchCategory = async (id: number): Promise<ICatalogItem> => {
  const {data} = await guestInstance.get(`category/getone/${id}`);

  return data;
};

// Создание, обновление, удаление брендов, получение списка всех бредов

export const createBrand = async (brand: {name: string}): Promise<ICatalogItem> => {
  const {data} = await authInstance.post('brand/create', brand);

  return data;
};

export const updateBrand = async (id: number, brand: {name: string}): Promise<ICatalogItem> => {
  const {data} = await authInstance.put(`brand/update/${id}`, brand);

  return data;
};

export const deleteBrand = async (id: number): Promise<ICatalogItem> => {
  const {data} = await authInstance.delete(`brand/delete/${id}`);

  return data;
};

export const fetchBrands = async (): Promise<ICatalogItem[]> => {
  const {data} = await guestInstance.get('brand/getall');

  return data;
};

export const fetchBrand = async (id: number): Promise<ICatalogItem> => {
  const {data} = await guestInstance.get(`brand/getone/${id}`);

  return data;
};

// Создание, обновление, удаление продуктового решения, получение списка всех решений

export const createArea = async (area: {name: string}): Promise<ICatalogItem> => {
  const {data} = await authInstance.post('area/create', area);

  return data;
};

export const updateArea = async (id: number, area: {name: string}): Promise<ICatalogItem> => {
  const {data} = await authInstance.put(`area/update/${id}`, area);

  return data;
};

export const deleteArea = async (id: number): Promise<ICatalogItem> => {
  const {data} = await authInstance.delete(`area/delete/${id}`);

  return data;
};

export const fetchAreas = async (): Promise<ICatalogItem[]> => {
  const {data} = await guestInstance.get('area/getall');

  return data;
};

export const fetchArea = async (id: number): Promise<ICatalogItem> => {
  const {data} = await guestInstance.get(`area/getone/${id}`);

  return data;
};

// Создание, обновление, удаление товара, получение списка всех товаров
export const createProduct = async (product: FormData): Promise<IProduct> => {
  const {data} = await authInstance.post('product/create', product);

  return data;
};

export const updateProduct = async (id: number, product: FormData): Promise<IUpdatedProduct> => {
  const {data} = await authInstance.put(`product/update/${id}`, product);

  return data;
};

export const deleteProduct = async (id: number): Promise<IProduct> => {
  const {data} = await authInstance.delete(`product/delete/${id}`);

  return data;
};

export const fetchAllProducts = async (
  categoryId: number[] | null,
  brandId: number[] | null,
  areaId: number[] | null,
  page: number,
  limit: number,
): Promise<IAllProducts> => {
  let url = 'product/getall';

  // фильтр товаров по категории и/или бренду
  if (categoryId) url = `${url}/categoryId/${categoryId}`;
  if (brandId) url = `${url}/brandId/${brandId}`;
  if (areaId) url = `${url}/areaId/${areaId}`;
  const {data} = await guestInstance.get(url, {
    params: {
      // GET-параметры для постраничной навигации
      page,
      limit,
    },
  });

  return data;
};

export const fetchOneProduct = async (id: number): Promise<IProductWithProps> => {
  const {data} = await guestInstance.get(`product/getone/${id}`);

  return data;
};

export const fetchProdRating = async (id: number): Promise<IRating> => {
  const {data} = await guestInstance.get(`rating/product/${id}`);

  return data;
};

/*
 *Создание, обновление и удаление характеристик товара
 */

export const createProperty = async (productId: number, property: IProductProp): Promise<IProperty> => {
  const {data} = await authInstance.post(`product/${productId}/property/create`, property);

  return data;
};

export const updateProperty = async (productId: number, id: number, property: IProductProp): Promise<IProperty> => {
  const {data} = await authInstance.put(`product/${productId}/property/update/${id}`, property);

  return data;
};

export const deleteProperty = async (productId: number, id: number): Promise<IProperty> => {
  const {data} = await authInstance.delete(`product/${productId}/property/delete/${id}`);

  return data;
};
