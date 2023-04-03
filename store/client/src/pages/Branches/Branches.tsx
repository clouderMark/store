import {Container} from '@mui/material';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import img from './images/branche-header.webp';
import CentererImage from '../../components/CentererImage/CentererImage';
import StrongWithTitle from '../../components/StrongWithTitle/StrongWithTitle';
import BranchesList from '../../components/BranchesList/BranchesList';
import Newsletter from '../../components/Newsletter/Newsletter';
import Footer from '../../components/Footer/Footer';

const content = {
  p: 'Отрасли',
  title: 'Find the right product for your application',
};

const Branches = () => (
  <>
    <CentererImage img={img} />
    <Breadcrumbs />
    <Container maxWidth={false}>
      <StrongWithTitle content={content} />
      <BranchesList />
    </Container>
    <Newsletter />
    <Footer />
  </>
);

export default Branches;
