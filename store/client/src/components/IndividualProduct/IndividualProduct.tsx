import {NavLink} from 'react-router-dom';
import {Box, Typography, Button} from '@mui/material';
import {box} from './styles/box';
import {content} from './styles/content';
import {button} from './styles/button';

const IndividualProduct = () => (
  <Box sx={box}>
    <Typography
      component="h3"
      sx={content.top}
    >
      Не можете найти нужный продукт?
    </Typography>
    <Typography
      component="p"
      sx={content.low}
    >
      Мы так же изготавливаем продукты под индивидуальные требования
    </Typography>
    <Button
      component={NavLink}
      to="/services"
      sx={button}
    >
      к разработке продуктов
    </Button>
  </Box>
);

export default IndividualProduct;
