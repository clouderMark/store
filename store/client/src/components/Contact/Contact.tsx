import {FormEvent} from 'react';
import {Box, Typography, Container, TextField, FormLabel, RadioGroup, FormControlLabel, Radio} from '@mui/material';
import {box} from './styles/box';
import {form} from './styles/form';

const Contact = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Box sx={box}>
      <Container maxWidth={false} sx={box.container}>
        <Box sx={box.content}>
          <Typography component="h6">Контакт</Typography>
          <Typography component="h3">Вы имеете какие-либо вопросы? Мы будем рады помочь Вам</Typography>
          <Typography component="p">
            Хотели бы Вы совет эксперта в том какой продукт был бы лучше? Тогда просто свяжитесь с нами через эту форму!
            Мы будем рыды Вам помочь, или свяжитесь с нами по телефону или факсу
          </Typography>
        </Box>
        <Box noValidate onSubmit={handleSubmit} component="form" sx={form}>
          <FormLabel sx={form.label}>Как с нами свзаться?*</FormLabel>
          <RadioGroup row>
            <FormControlLabel
              value="commercial"
              control={<Radio sx={form.checkbox} />}
              label={<Typography sx={form.checkbox.label}>Коммерческое</Typography>}
            />
            <FormControlLabel
              value="privat"
              control={<Radio sx={form.checkbox} />}
              label={<Typography sx={form.checkbox.label}>Личное</Typography>}
            />
          </RadioGroup>
          <Box sx={form.block}>
            <TextField name="company" value="" placeholder="Компания" sx={form.textField} />
            <TextField name="name" value="" placeholder="Имя и Фамилия" sx={form.textField} />
            <TextField name="email" value="" placeholder="E-mail *" sx={form.textField} />
            <TextField name="phone" value="" placeholder="Телефон" sx={form.textField} />
          </Box>
          <TextField
            name="phone"
            value=""
            placeholder="Ваш вопрос"
            sx={form.textFieldMultiline}
            multiline
            rows={4}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
