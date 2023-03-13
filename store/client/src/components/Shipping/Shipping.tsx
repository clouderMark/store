import {Box, Typography} from '@mui/material';
import {box} from './styles/box';

const Shipping = () => (
  <Box sx={box}>
    <Typography sx={box.content.common} component="h2">
      <Typography sx={box.content.top} component="span">Виды доставки</Typography>
      Наши партнеры доставки и оплаты
    </Typography>
    <Box>
    </Box>
  </Box>
);

export default Shipping;
