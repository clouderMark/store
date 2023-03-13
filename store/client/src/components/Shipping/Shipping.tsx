import {Box, Typography} from '@mui/material';
import {box} from './styles/box';
import img1 from './images/payment-paypal.png';
import img2 from './images/shipping-dhl.png';

const Shipping = () => (
  <Box sx={box}>
    <Typography sx={box.content.title} component="h2">
      <Typography sx={box.content.top} component="span">
        Виды доставки
      </Typography>
      Наши партнеры доставки и оплаты
    </Typography>
    <Box sx={box.content.images}>
      <Box component="img" sx={box.content.img} src={img1} alt="paypal" />
      <Box component="img" sx={box.content.img} src={img2} alt="dhl"/>
    </Box>
  </Box>
);

export default Shipping;
