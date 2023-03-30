import {NavLink} from 'react-router-dom';
import {Button, Box} from '@mui/material';
import HeaderImage from '../../components/HeaderImage/HeaderImage';
import LinkList from '../../components/LinkList/LinkList';
import LinkToProducts from '../../components/LinkToProducts/LinkToProducts';
import Slider from '../../components/Slider/Slider';
import LinkToServices from '../../components/LinkToServices/LinkToServices';

const Main = () => (
  <>
    <HeaderImage />
    <LinkList />
    <LinkToProducts />
    <Slider />
    <Box component="p" sx={{width: '100%', display: 'flex', justifyContent: 'center', mt: '70px', mb: '140px'}}>
      <Button component={NavLink} to={'/shop'} variant="contained" color="first">
        Смотреть все продукты
      </Button>
    </Box>
    <LinkToServices />
  </>
);

export default Main;
