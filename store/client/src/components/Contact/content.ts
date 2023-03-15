export const contact = {
  content: {
    headers: {
      top: 'Контакт',
      bottom: 'Вы имеете какие-либо вопросы? Мы будем рады помочь Вам',
    },
    paragraph: // eslint-disable-next-line
      'Хотели бы Вы совет эксперта в том какой продукт был бы лучше? Тогда просто свяжитесь с нами через эту форму! Мы будем рыды Вам помочь, или свяжитесь с нами по телефону или факсу',
    contacts: {
      paragraph: 'DIAMANT Polymer сервисный центр',
      phone: '+375259270159',
      working: 'Monday - Friday: 8:00 a.m. - 4:00 p.m.',
    },
  },
};

export const formContent: IFormContent = {
  label: 'Как с нами свзаться?*',
  checkbox: [
    {
      value: 'commercial',
      content: 'Коммерческое',
    },
    {
      value: 'privat',
      content: 'Коммерческое',
    },
  ],
  textField: [
    {
      name: 'company',
      placeholder: 'Компания',
      multiline: false,
      style: 'textField',
      rows: 1,
    },
    {
      name: 'name',
      placeholder: 'Имя и Фамилия',
      multiline: false,
      style: 'textField',
      rows: 1,
    },
    {
      name: 'email',
      placeholder: 'E-mail *',
      multiline: false,
      style: 'textField',
      rows: 1,
    },
    {
      name: 'phone',
      placeholder: 'Телефон',
      multiline: false,
      style: 'textField',
      rows: 1,
    },
    {
      name: 'question',
      placeholder: 'Ваш вопрос',
      multiline: true,
      style: 'textFieldMultiline',
      rows: 4,
    },
  ],
  button: 'Отправить запрос',
};

interface IFormContent {
  label: string;
  checkbox: Array<ICheckbox>;
  textField: Array<ITextField>;
  button: string;
}

interface ITextField {
  name: 'company' | 'name' | 'email' | 'phone' | 'question';
  placeholder: string;
  multiline: boolean;
  style: 'textField' | 'textFieldMultiline';
  rows: number;
}

interface ICheckbox {
  value: string;
  content: string;
}
