import {FormEvent, Dispatch, SetStateAction} from 'react';
import {IDefaultValid, IDefaultValue} from './types';
import isValid from './isValid';
import {defaultValue, defaultValid} from './defaultValue';
import {sendMessage} from '../../http/contactAPI';

interface IProps {
  event: FormEvent<HTMLFormElement>;
  value: IDefaultValue;
  setValue: Dispatch<SetStateAction<IDefaultValue>>;
  valid: IDefaultValid;
  setValid: Dispatch<SetStateAction<IDefaultValid>>;
  setError: Dispatch<SetStateAction<boolean>>;
  setSuccess: Dispatch<SetStateAction<boolean>>;
}

export const handleSubmit = async (props: IProps) => {
  props.event.preventDefault();

  const company = props.event.currentTarget.elements.namedItem('company') as HTMLInputElement;
  const name = props.event.currentTarget.elements.namedItem('name') as HTMLInputElement;
  const email = props.event.currentTarget.elements.namedItem('email') as HTMLInputElement;
  const phone = props.event.currentTarget.elements.namedItem('phone') as HTMLInputElement;
  const question = props.event.currentTarget.elements.namedItem('question') as HTMLInputElement;
  const type = props.event.currentTarget.elements.namedItem('type') as HTMLInputElement;

  props.setValue({
    company: company.value.trim(),
    name: name.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    question: question.value.trim(),
    type: type.value.trim(),
  });

  props.setValid({
    company: isValid(company),
    name: isValid(name),
    email: isValid(email),
    phone: isValid(phone),
    question: isValid(question),
    type: isValid(type),
  });

  if (!props.valid.type) {
    props.setError(true);
  } else {
    props.setError(false);
  }

  if (
    props.valid.company &&
    props.valid.name &&
    props.valid.email &&
    props.valid.phone &&
    props.valid.question &&
    props.valid.type
  ) {
    const body = {...props.value};

    sendMessage(body).then((res) => {
      props.setSuccess(res);
      setTimeout(() => {
        props.setSuccess(false);
      }, 5000);
    })
      .catch(console.error);

    props.setValue(defaultValue);
    props.setValid(defaultValid);
  }
};
