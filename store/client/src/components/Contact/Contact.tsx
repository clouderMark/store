import {FormEvent} from 'react';
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
} from '@mui/material';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import {box} from './styles/box';
import {form} from './styles/form';
import {contact, formContent} from './content';

const Contact = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          <RadioGroup row>
            <FormControlLabel
              value="commercial"
              control={<Radio sx={form.checkbox} />}
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
          <Box sx={form.block}>
            <TextField name="company" value="" placeholder={formContent.textField.company} sx={form.textField} />
            <TextField name="name" value="" placeholder={formContent.textField.name} sx={form.textField} />
            <TextField name="email" value="" placeholder={formContent.textField.email} sx={form.textField} />
            <TextField name="phone" value="" placeholder={formContent.textField.phone} sx={form.textField} />
          </Box>
          <TextField
            name="question"
            value=""
            placeholder={formContent.textField.question}
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
