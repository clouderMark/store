import {NavLink} from 'react-router-dom';
import {Button, Box} from '@mui/material';
import HeaderImage from '../../components/HeaderImage/HeaderImage';
import LinkList from '../../components/LinkList/LinkList';
import LinkToProducts from '../../components/LinkToProducts/LinkToProducts';
import Slider from '../../components/Slider/Slider';
import LinkToServices from '../../components/LinkToServices/LinkToServices';
import {EPath} from '../../enums/EPath';
import Quality from '../../components/Quality/Quality';

const Main = () => (
  <>
    <HeaderImage />
    <LinkList />
    <LinkToProducts />
    <Slider />
    <Box component="p" sx={{width: '100%', display: 'flex', justifyContent: 'center', mt: '70px', mb: '140px'}}>
      <Button component={NavLink} to={EPath.Shop} variant="contained" color="first">
        Смотреть все продукты
      </Button>
    </Box>
    <LinkToServices />
    <Quality />
  </>
);

export default Main;
