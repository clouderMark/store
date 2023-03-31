import {NavLink} from 'react-router-dom';
import {Button, Box} from '@mui/material';
import HeaderImage from '../../components/HeaderImage/HeaderImage';
import LinkList from '../../components/LinkList/LinkList';
import LinkToProducts from '../../components/LinkToProducts/LinkToProducts';
import Slider from '../../components/Slider/Slider';
import LinkToServices from '../../components/LinkToServices/LinkToServices';
import {EPath} from '../../enums/EPath';
import LinkToContactUs from '../../components/LinkToContactUs/LinkToContactUs';
import CenteredContainer from '../../components/CentererContainer/CentererContainer';
import {quality} from '../../components/commonContent/quality';
import {partnership} from '../../components/commonContent/partnerships';
import Contact from '../../components/Contact/Contact';
import Newsletter from '../../components/Newsletter/Newsletter';
import Footer from '../../components/Footer/Footer';

const Main = () => (
  <>
    <HeaderImage />
    <LinkList />
    <LinkToProducts />
    <Slider />
    <Box component="p" sx={{width: '100%', display: 'flex', justifyContent: 'center', mt: '70px', mb: '70px'}}>
      <Button component={NavLink} to={EPath.Shop} variant="contained" color="first">
        Смотреть все продукты
      </Button>
    </Box>
    <LinkToServices />
    <CenteredContainer content={quality} />
    <LinkToContactUs />
    <CenteredContainer content={partnership} />
    <Contact />
    <Newsletter />
    <Footer />
  </>
);

export default Main;
