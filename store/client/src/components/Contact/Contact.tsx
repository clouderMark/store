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
  Alert,
  Fade,
} from '@mui/material';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import {box} from './styles/box';
import {form} from './styles/form';
import {contact, formContent} from './content';
import {IDefaultValid} from './types';
import {defaultValue, defaultValid} from './defaultValue';
import isValid from './isValid';
import {handleSubmit as makeSubmit} from './handleSubmit';
import {alert} from './styles/alert';

const Contact = () => {
  const [value, setValue] = useState(defaultValue);
  const [valid, setValid] = useState<IDefaultValid>(defaultValid);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue({...value, [event.target.name]: event.target.value});
    setValid({...valid, [event.target.name]: isValid(event.target)});
    if (event.target.name === 'type') {
      setError(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    await makeSubmit({event, value, setValue, valid, setValid, setError, setSuccess});
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
              {formContent.checkbox.map((el, i) => (
                <FormControlLabel
                  value={el.value}
                  control={<Radio sx={form.checkbox} />}
                  label={
                    <Typography sx={form.checkbox.label} component="label">
                      {el.content}
                    </Typography>
                  }
                  key={i}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Box sx={form.block}>
            {formContent.textField.map((el, i) => (
              <TextField
                name={el.name}
                value={value[el.name]}
                error={valid[el.name] === false}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                placeholder={el.placeholder}
                sx={form[el.style]}
                multiline={el.multiline}
                rows={el.rows}
                key={i}
              />
            ))}
          </Box>
          <Button type="submit" sx={form.button}>
            {formContent.button}
          </Button>
        </Box>
      </Container>
      <Fade in={success}>
        <Alert severity="success" sx={alert} elevation={6}>
          {formContent.alert}
        </Alert>
      </Fade>
    </Box>
  );
};

export default Contact;
