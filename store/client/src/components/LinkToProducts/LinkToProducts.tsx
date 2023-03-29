import {NavLink} from 'react-router-dom';
import {Container, Box, Typography, Button} from '@mui/material';
import {linkToProducts} from './styles/linkToProducts';
import {content} from './content';

const LinkToProducts = () => (
  <Container sx={linkToProducts.container} maxWidth={false}>
    <Typography sx={linkToProducts.title}>{content.row1.title}</Typography>
    <Box sx={linkToProducts.row}>
      <Typography sx={linkToProducts.strong} component="p">
        {content.row2.title}
      </Typography>
      <Typography sx={linkToProducts.p} component="p">
        {content.row2.p}
      </Typography>
      <Button component={NavLink} to={`/${content.row2.button.to}`} variant='contained' color='primary'>
        {content.row2.button.content}
      </Button>
    </Box>
  </Container>
);

export default LinkToProducts;
