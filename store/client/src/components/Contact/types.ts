export interface IDefaultValue {
  company: string,
  name: string,
  email: string,
  phone: string,
  question: string,
  type: string,
}

export interface IDefaultValid {
  company: null | boolean,
  name: null | boolean,
  email: null | boolean,
  phone: null | boolean,
  question: null | boolean,
  type: null | boolean,
}
