import {Container, Box, Typography, TextField, Button} from '@mui/material';
import {box} from './styles/box';
import letter from './images/envelop.svg';

const content = {
  title: {
    top: 'Новостная рассылка',
    bottom: 'Подпишитесь на нашу новостную рассылку и получайте новости о продуктах прямо на email.',
  },
  placeholder: 'Ваш email адресс',
  button: 'Подписаться',
};

const Newsletter = () => (
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
      <Box component="form" sx={box.form}>
        <TextField placeholder={content.placeholder} sx={box.inputText}></TextField>
        <Button type="submit" sx={box.button}>
          {content.button}
        </Button>
      </Box>
    </Container>
  </Box>
);

export default Newsletter;
