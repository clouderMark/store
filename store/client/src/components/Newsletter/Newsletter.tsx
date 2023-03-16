import {FormEvent, useState, ChangeEvent} from 'react';
import {Container, Box, Typography, TextField, Button} from '@mui/material';
import {box} from './styles/box';
import letter from './images/envelop.svg';
import {content} from './content';
import {subscribe} from '../../http/subscription';
import AlertLine from '../AlertLine/AlertLine';

const Newsletter = () => {
  const [value, setValue] = useState('');
  const [valid, setValid] = useState<null | boolean>(null);
  const [success, setSuccess] = useState(false);
  const pattern = /^[-_.a-z]+@([-a-z]+\.){1,2}[a-z]+$/i;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setValid(pattern.test(event.target.value.trim()));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (event.currentTarget.elements.namedItem('email') as HTMLInputElement).value.trim();

    if (valid) {
      subscribe({email})
        .then(() => {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        });

      setValue('');
      setValid(null);
    }
  };

  return (
    <Box sx={box}>
      <Container maxWidth={false} sx={box.container}>
        <Box sx={box.box}>
          <Box sx={box.imgInner}>
            <Box component="img" src={letter} sx={box.img} />
          </Box>
          <Typography component="h3" sx={box.title}>
            <Typography component="span" sx={box.titleTop}>
              {content.title.top}
            </Typography>
            {content.title.bottom}
          </Typography>
        </Box>
        <Box noValidate component="form" sx={box.form} onSubmit={handleSubmit}>
          <TextField
            placeholder={content.placeholder}
            sx={box.inputText}
            name="email"
            value={value}
            error={valid === false}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          />
          <Button type="submit" sx={box.button}>
            {content.button}
          </Button>
        </Box>
      </Container>
      <AlertLine success={success} content={'Подписка оформлена'}/>
    </Box>
  );
};

export default Newsletter;
