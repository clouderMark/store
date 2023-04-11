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
  ISlider,
  IFetchIndystry,
} from '../types/types';

// Создание, обновление, удаление индустрии, получение списка всех индустрий

export const createIndustry = async (industry: FormData): Promise<IFetchIndystry> => {
  const {data} = await authInstance.post('industry/create', industry);

  return data;
};

export const updateIndustry = async (id: number, industry: FormData): Promise<IFetchIndystry> => {
  const {data} = await authInstance.put(`industry/update/${id}`, industry);

  return data;
};

export const deleteIndustry = async (id: number): Promise<IFetchIndystry> => {
  const {data} = await authInstance.delete(`industry/delete/${id}`);

  return data;
};

export const fetchIndustries = async (): Promise<IFetchIndystry[]> => {
  const {data} = await guestInstance.get('industry/getall');

  return data;
};

export const fetchIndustry = async (id: number): Promise<IFetchIndystry> => {
  const {data} = await guestInstance.get(`industry/getone/${id}`);

  return data;
};

export const createSubIndustry = async (industry: FormData): Promise<IFetchIndystry> => {
  const {data} = await authInstance.post('subindustry/create', industry);

  return data;
};

export const updateSubIndustry = async (id: number, industry: FormData): Promise<IFetchIndystry> => {
  const {data} = await authInstance.put(`subindustry/update/${id}`, industry);

  return data;
};

export const deleteSubIndustry = async (id: number): Promise<IFetchIndystry> => {
  const {data} = await authInstance.delete(`subindustry/delete/${id}`);

  return data;
};

export const fetchSubIndustries = async (): Promise<IFetchIndystry[]> => {
  const {data} = await guestInstance.get('subindustry/getall');

  return data;
};

export const fetchSubIndustry = async (id: number): Promise<IFetchIndystry> => {
  const {data} = await guestInstance.get(`subindustry/getone/${id}`);

  return data;
};

// Создание, обновление, удаление решений, получение списка всех решений

export const createSolution = async (solution: {name: string}): Promise<ICatalogItem> => {
  const {data} = await authInstance.post('solution/create', solution);

  return data;
};

export const updateSolution = async (id: number, solution: {name: string}): Promise<ICatalogItem> => {
  const {data} = await authInstance.put(`solution/update/${id}`, solution);

  return data;
};

export const deleteSolution = async (id: number): Promise<ICatalogItem> => {
  const {data} = await authInstance.delete(`solution/delete/${id}`);

  return data;
};

export const fetchSolutions = async (): Promise<ICatalogItem[]> => {
  const {data} = await guestInstance.get('solution/getall');

  return data;
};

export const fetchSolution = async (id: number): Promise<ICatalogItem> => {
  const {data} = await guestInstance.get(`solution/getone/${id}`);

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
  industryId: number[] | null,
  solutionId: number[] | null,
  areaId: number[] | null,
  page: number,
  limit: number,
): Promise<IAllProducts> => {
  let url = 'product/getall';

  // фильтр товаров по индустриям и/или решению
  if (industryId) url = `${url}/industryId/${industryId}`;
  if (solutionId) url = `${url}/solutionId/${solutionId}`;
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

export const fetchProductsForSlider = async (limit: number): Promise<ISlider[]> => {
  const {data} = await guestInstance.get('product/slider', {
    params: {
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
