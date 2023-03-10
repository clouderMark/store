import {NavLink} from 'react-router-dom';
import {Box, Typography, Button} from '@mui/material';
import bg1 from './bg1.png';
import bg2 from './bg2.png';

const IndividualProduct = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '281px',
      backgroundColor: '#008f38',
      backgroundImage: `url(${bg1}), url(${bg2})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '0 -150px, right 0',
      marginTop: '-20px',
    }}
  >
    <Typography
      component="h3"
      sx={{
        textAlign: 'center',
        color: 'white',
        fontSize: '30px',
        fontWeight: 300,
      }}
    >
      Не можете найти нужный продукт?
    </Typography>
    <Typography
      component="p"
      sx={{
        textAlign: 'center',
        color: 'white',
        fontSize: '18px',
        fontWeight: 300,
      }}
    >
      Мы так же изготавливаем продукты под индивидуальные требования
    </Typography>
    <Button
      component={NavLink} to='/services'
      sx={{
        width: '255px',
        height: '54px',
        marginTop: '20px',
        backgroundColor: 'white',
        borderRadius: 0,
        color: '#008f38',
        '&:hover': {
          backgroundColor: '#78ae7b',
          color: 'white',
        },
      }}
    >
      к разработке продуктов
    </Button>
  </Box>
);

export default IndividualProduct;
