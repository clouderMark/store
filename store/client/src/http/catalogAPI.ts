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
  IAreaResponse,
} from '../types/types';
import {ERoute} from '../enums/ERoute';

// Создание, обновление, удаление индустрии, получение списка всех индустрий

export const createIndustry = async (industry: FormData): Promise<IAreaResponse> => {
  const {data} = await authInstance.post(`${ERoute.Industry}/${ERoute.Create}`, industry);

  return data;
};

export const updateIndustry = async (id: number, industry: FormData): Promise<IAreaResponse> => {
  const {data} = await authInstance.put(`${ERoute.Industry}/${ERoute.Update}/${id}`, industry);

  return data;
};

export const deleteIndustry = async (id: number): Promise<IAreaResponse> => {
  const {data} = await authInstance.delete(`${ERoute.Industry}/${ERoute.Delete}/${id}`);

  return data;
};

export const fetchIndustries = async (): Promise<IAreaResponse[]> => {
  const {data} = await guestInstance.get(`${ERoute.Industry}/${ERoute.GetAll}`);

  return data;
};

export const fetchIndustry = async (id: number): Promise<IAreaResponse> => {
  const {data} = await guestInstance.get(`${ERoute.Industry}/${ERoute.GetOne}/${id}`);

  return data;
};

export const createSubIndustry = async (industry: FormData): Promise<IAreaResponse> => {
  const {data} = await authInstance.post(`${ERoute.SubIndustry}/${ERoute.Create}`, industry);

  return data;
};

export const updateSubIndustry = async (id: number, industry: FormData): Promise<IAreaResponse> => {
  const {data} = await authInstance.put(`${ERoute.SubIndustry}/${ERoute.Update}/${id}`, industry);

  return data;
};

export const deleteSubIndustry = async (id: number): Promise<IAreaResponse> => {
  const {data} = await authInstance.delete(`${ERoute.SubIndustry}/${ERoute.Delete}/${id}`);

  return data;
};

export const fetchSubIndustries = async (): Promise<IAreaResponse[]> => {
  const {data} = await guestInstance.get(`${ERoute.SubIndustry}/${ERoute.GetAll}`);

  return data;
};

export const fetchSubIndustry = async (id: number): Promise<IAreaResponse> => {
  const {data} = await guestInstance.get(`${ERoute.SubIndustry}/${ERoute.GetOne}/${id}`);

  return data;
};

// Создание, обновление, удаление решений, получение списка всех решений

export const createSolution = async (solution: FormData): Promise<ICatalogItem> => {
  const {data} = await authInstance.post(`${ERoute.Solutions}/${ERoute.Create}`, solution);

  return data;
};

export const updateSolution = async (id: number, solution: FormData): Promise<ICatalogItem> => {
  const {data} = await authInstance.put(`${ERoute.Solutions}/${ERoute.Update}/${id}`, solution);

  return data;
};

export const deleteSolution = async (id: number): Promise<ICatalogItem> => {
  const {data} = await authInstance.delete(`${ERoute.Solutions}/${ERoute.Delete}/${id}`);

  return data;
};

export const fetchSolutions = async (): Promise<ICatalogItem[]> => {
  const {data} = await guestInstance.get(`${ERoute.Solutions}/${ERoute.GetAll}`);

  return data;
};

export const fetchSolution = async (id: number): Promise<ICatalogItem> => {
  const {data} = await guestInstance.get(`${ERoute.Solutions}/${ERoute.GetOne}/${id}`);

  return data;
};

// Создание, обновление, удаление продуктового решения, получение списка всех решений

export const createArea = async (area: {name: string}): Promise<ICatalogItem> => {
  const {data} = await authInstance.post(`${ERoute.Area}/${ERoute.Create}`, area);

  return data;
};

export const updateArea = async (id: number, area: {name: string}): Promise<ICatalogItem> => {
  const {data} = await authInstance.put(`${ERoute.Area}/${ERoute.Update}/${id}`, area);

  return data;
};

export const deleteArea = async (id: number): Promise<ICatalogItem> => {
  const {data} = await authInstance.delete(`${ERoute.Area}/${ERoute.Delete}/${id}`);

  return data;
};

export const fetchAreas = async (): Promise<ICatalogItem[]> => {
  const {data} = await guestInstance.get(`${ERoute.Area}/${ERoute.GetAll}`);

  return data;
};

export const fetchArea = async (id: number): Promise<ICatalogItem> => {
  const {data} = await guestInstance.get(`${ERoute.Area}/${ERoute.GetOne}/${id}`);

  return data;
};

// Создание, обновление, удаление товара, получение списка всех товаров
export const createProduct = async (product: FormData): Promise<IProduct> => {
  const {data} = await authInstance.post(`${ERoute.Product}/${ERoute.Create}`, product);

  return data;
};

export const updateProduct = async (id: number, product: FormData): Promise<IUpdatedProduct> => {
  const {data} = await authInstance.put(`${ERoute.Product}/${ERoute.Update}/${id}`, product);

  return data;
};

export const deleteProduct = async (id: number): Promise<IProduct> => {
  const {data} = await authInstance.delete(`${ERoute.Product}/${ERoute.Delete}/${id}`);

  return data;
};

export const fetchAllProducts = async (
  industryId: number[] | null,
  solutionId: number[] | null,
  areaId: number[] | null,
  page: number,
  limit: number,
): Promise<IAllProducts> => {
  let url = `${ERoute.Product}/${ERoute.GetAll}`;

  // фильтр товаров по индустриям и/или решению
  if (industryId) url = `${url}/${ERoute.Industry}Id/${industryId}`;
  if (solutionId) url = `${url}/${ERoute.Solutions}Id/${solutionId}`;
  if (areaId) url = `${url}/${ERoute.Area}Id/${areaId}`;
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
  const {data} = await guestInstance.get(`${ERoute.Product}/slider`, {
    params: {
      limit,
    },
  });

  return data;
};

export const fetchOneProduct = async (id: number): Promise<IProductWithProps> => {
  const {data} = await guestInstance.get(`${ERoute.Product}/${ERoute.GetOne}/${id}`);

  return data;
};

export const fetchProdRating = async (id: number): Promise<IRating> => {
  const {data} = await guestInstance.get(`rating/${ERoute.Product}/${id}`);

  return data;
};

/*
 *Создание, обновление и удаление характеристик товара
 */

export const createProperty = async (productId: number, property: IProductProp): Promise<IProperty> => {
  const {data} = await authInstance.post(
    `${ERoute.Product}/${productId}/${ERoute.Property}/${ERoute.Create}`,
    property,
  );

  return data;
};

export const updateProperty = async (productId: number, id: number, property: IProductProp): Promise<IProperty> => {
  const {data} = await authInstance.put(
    `${ERoute.Product}/${productId}/${ERoute.Property}/${ERoute.Update}/${id}`,
    property,
  );

  return data;
};

export const deleteProperty = async (productId: number, id: number): Promise<IProperty> => {
  const {data} = await authInstance.delete(`${ERoute.Product}/${productId}/${ERoute.Property}/${ERoute.Delete}/${id}`);

  return data;
};
