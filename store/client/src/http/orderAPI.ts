import {guestInstance, authInstance} from './index';
import {IOrderBody, IOrder, IOrderWithItems} from '../types/types.js';
import {ERoute} from '../enums/ERoute';
/*
 *только для администратора
 */

// создаем новй заказ
export const adminCreate = async (body: IOrderBody): Promise<IOrderWithItems> => {
  const {data} = await authInstance.post(`${ERoute.Order}/${ERoute.Admin}/${ERoute.Create}`, body);

  return data;
};
// получить список всех заказов магазина

export const adminGetAll = async (): Promise<IOrder[]> => {
  const {data} = await authInstance.get(`${ERoute.Order}/${ERoute.Admin}/${ERoute.GetAll}`);

  return data;
};

// получить список заказов пользователя
export const adminGetUser = async (id: number): Promise<IOrder> => {
  const {data} = await authInstance.get(`${ERoute.Order}/${ERoute.Admin}/${ERoute.GetAll}/${ERoute.User}/${id}`);

  return data;
};

// Получить заказ по id
export const adminGetOne = async (id: number): Promise<IOrderWithItems> => {
  const {data} = await authInstance.get(`${ERoute.Order}/${ERoute.Admin}/${ERoute.GetOne}/${id}`);

  return data;
};

// Обновить статус заказа
export const updateProductStatus = async (id: number, status: FormData): Promise<IOrder> => {
  const {data} = await authInstance.put(`${ERoute.Order}/${ERoute.Admin}/${ERoute.Update}/${id}`, status);

  return data;
};

// удалить заказ по id
export const adminDelete = async (id: number): Promise<IOrder> => {
  const {data} = await authInstance.delete(`${ERoute.Order}/${ERoute.Admin}/${ERoute.Delete}/${id}`);

  return data;
};

/*
 *для авторизованного пользователя
 */

// Создать новый заказ
export const userCreate = async (body: IOrderBody): Promise<IOrderWithItems> => {
  const {data} = await authInstance.post(`${ERoute.Order}/${ERoute.User}/${ERoute.Create}`, body);

  return data;
};

// получить список всех заказов пользователя
export const userGetAll = async (): Promise<IOrder[]> => {
  const {data} = await authInstance.get(`${ERoute.Order}/${ERoute.User}/${ERoute.GetAll}`);

  return data;
};

// получить один заказ пользователя
export const userGetOne = async (id: number): Promise<IOrderWithItems> => {
  const {data} = await authInstance.get(`${ERoute.Order}/${ERoute.User}/${ERoute.GetOne}/${id}`);

  return data;
};

/*
 *для неавторизованного пользователя
 */

// создать новый заказ
export const guestCreate = async (body: IOrderBody): Promise<IOrderWithItems> => {
  const {data} = await guestInstance.post(`${ERoute.Order}/${ERoute.Guest}/${ERoute.Create}`, body);

  return data;
};
