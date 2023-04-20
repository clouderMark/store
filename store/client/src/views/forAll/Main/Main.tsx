import {NavLink} from 'react-router-dom';
import {Button, Box} from '@mui/material';
import HeaderImage from '../../../components/HeaderImage/HeaderImage';
import LinkList from '../../../components/LinkList/LinkList';
import LinkToProducts from '../../../components/LinkToProducts/LinkToProducts';
import Slider from '../../../components/Slider/Slider';
import {EPath} from '../../../enums/EPath';
import CenteredContainer from '../../../components/CentererContainer/CentererContainer';
import {quality} from '../../../components/commonContent/quality';
import {partnership} from '../../../components/commonContent/partnerships';
import Contact from '../../../components/Contact/Contact';
import Newsletter from '../../../components/Newsletter/Newsletter';
import Footer from '../../../components/Footer/Footer';
import Info from '../../../components/Info';
import NavLinkButtons from '../../../components/NavLinkButtons/NavLinkButtons';
import {content as contactUs, buttons as buttonsContact} from '../../../components/commonContent/contactUs/content';
import {content as service, buttons as buttonsSevice} from '../../../components/commonContent/service/content';

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
    <Info
      item={service}
      buttons={<NavLinkButtons buttons={buttonsSevice} sx={{mt: '40px', textTransform: 'capitalize'}} />}
    />
    <CenteredContainer content={quality} />
    <Info
      item={contactUs}
      buttons={
        <NavLinkButtons
          buttons={buttonsContact}
          sx={{
            textTransform: 'capitalize',
            mr: '10px',
            mb: '10px',
          }}
        />
      }
    />
    <CenteredContainer content={partnership} />
    <Contact />
    <Newsletter />
    <Footer />
  </>
);

export default Main;
