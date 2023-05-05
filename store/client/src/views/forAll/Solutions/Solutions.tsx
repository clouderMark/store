import {Container} from '@mui/material';
import {useState} from 'react';
import CentererImage from '../../../components/CentererImage/CentererImage';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import img from './images/header-produktloesung-1.jpg';
import StrongWithTitle from '../../../components/StrongWithTitle/StrongWithTitle';
import CardList from '../../../components/CardList/CardList';
import {EName} from '../../../enums/EName';
import Newsletter from '../../../components/Newsletter/Newsletter';
import Footer from '../../../components/Footer/Footer';

const content = {
  p: EName.Solutions,
  title: 'Find the right product for your application',
};

const solutions = [
  {
    id: 1,
    cardImage: null,
    name: 'Fillers',
  },
];

const Solutions = () => {
  const [fetching] = useState(false);

  return (
    <>
      <CentererImage img={img} />
      <Breadcrumbs />
      <Container maxWidth={false}>
        <StrongWithTitle content={content} />
        {fetching ? null : <CardList data={solutions!} />}
      </Container>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Solutions;
