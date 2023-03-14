import {Box, Typography} from '@mui/material';
import {box} from './styles/box';
import {content} from './content';

const Shipping = () => (
  <Box sx={box}>
    <Typography sx={box.content.title} component="h2">
      <Typography sx={box.content.top} component="span">
        {content.title.top}
      </Typography>
      {content.title.bottom}
    </Typography>
    <Box sx={box.content.images}>
      {content.images.map((el, i) => (
        <Box component="img" sx={box.content.img} src={el.img} alt={el.alt} key={i}/>
      ))}
    </Box>
  </Box>
);

export default Shipping;
