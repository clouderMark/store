import {FormEvent, useState, ChangeEvent} from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Link,
  Button,
  FormControl,
} from '@mui/material';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import {box} from './styles/box';
import {form} from './styles/form';
import {contact, formContent} from './content';
import {IDefaultValid} from './types';
import {defaultValue, defaultValid} from './defaultValue';
import isValid from './isValid';
import {handleSubmit as makeSubmit} from './handleSubmit';

const Contact = () => {
  const [value, setValue] = useState(defaultValue);
  const [valid, setValid] = useState<IDefaultValid>(defaultValid);
  const [error, setError] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue({...value, [event.target.name]: event.target.value});
    setValid({...valid, [event.target.name]: isValid(event.target)});
    if (event.target.name === 'type') {
      setError(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    makeSubmit({event, value, setValue, valid, setValid, setError});
  };

  return (
    <Box sx={box}>
      <Container maxWidth={false} sx={box.container}>
        <Box sx={box.content}>
          <Typography component="h6" sx={box.headers.top}>
            {contact.content.headers.top}
          </Typography>
          <Typography component="h3" sx={box.headers.bottom}>
            {contact.content.headers.bottom}
          </Typography>
          <Typography component="p" sx={box.paragraph}>
            {contact.content.paragraph}
          </Typography>
          <Typography component="p" sx={box.contacts.paragraph}>
            {contact.content.contacts.paragraph}
          </Typography>
          <Link underline="hover" href={`tel: ${contact.content.contacts.phone}`} sx={box.contacts.link}>
            <PhoneInTalkOutlinedIcon sx={box.contacts.link.img} />
            <Typography component="span" sx={box.contacts.link.number}>
              {contact.content.contacts.phone}
            </Typography>
          </Link>
          <Typography sx={box.contacts.working}>{contact.content.contacts.working}</Typography>
        </Box>
        <Box noValidate onSubmit={handleSubmit} component="form" sx={form}>
          <FormLabel sx={form.label}>{formContent.label}</FormLabel>
          <FormControl error={error} sx={form.control}>
            <RadioGroup
              name="type"
              value={value.type}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
              row
            >
              <FormControlLabel
                value="commercial"
                control={<Radio sx={form.checkbox}/>}
                label={
                  <Typography sx={form.checkbox.label} component="label">
                    {formContent.checkbox.commercial}
                  </Typography>
                }
              />
              <FormControlLabel
                value="privat"
                control={<Radio sx={form.checkbox} />}
                label={
                  <Typography sx={form.checkbox.label} component="label">
                    {formContent.checkbox.privat}
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
          <Box sx={form.block}>
            <TextField
              name="company"
              value={value.company}
              error={valid.company === false}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
              placeholder={formContent.textField.company}
              sx={form.textField}
            />
            <TextField
              name="name"
              value={value.name}
              error={valid.name === false}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
              placeholder={formContent.textField.name}
              sx={form.textField}
            />
            <TextField
              name="email"
              value={value.email}
              error={valid.email === false}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
              placeholder={formContent.textField.email}
              sx={form.textField}
            />
            <TextField
              name="phone"
              value={value.phone}
              error={valid.phone === false}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
              placeholder={formContent.textField.phone}
              sx={form.textField}
            />
          </Box>
          <TextField
            name="question"
            value={value.question}
            error={valid.question === false}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            placeholder={formContent.textField.question}
            sx={form.textFieldMultiline}
            multiline
            rows={4}
          />
          <Button type="submit" sx={form.button}>
            {formContent.button}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
