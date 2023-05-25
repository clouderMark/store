import {Container} from '@mui/material';
import {useEffect, useState} from 'react';
import CentererImage from '../../../components/CentererImage/CentererImage';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import img from './images/header-produktloesung-1.jpg';
import StrongWithTitle from '../../../components/StrongWithTitle/StrongWithTitle';
import CardList from '../../../components/CardList/CardList';
import {EName} from '../../../enums/EName';
import Newsletter from '../../../components/Newsletter/Newsletter';
import Footer from '../../../components/Footer/Footer';
import {fetchSolutionsWithImage} from '../../../http/catalogAPI';
import {ICatalogItemWithImage} from '../../../types/types';
import Progress from '../../../components/LinearDeterminate';

const content = {
  p: EName.Solutions,
  title: 'Find the right product for your application',
};

const Solutions = () => {
  const [items, setItems] = useState<ICatalogItemWithImage[]>();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchSolutionsWithImage()
      .then((data) => setItems(data))
      .finally(() => setFetching(false));
  }, []);

  if (fetching) {
    return <Progress />;
  }

  return (
    <>
      <CentererImage img={img} />
      <Breadcrumbs />
      <Container maxWidth={false}>
        <StrongWithTitle content={content} />
        {fetching ? null : <CardList data={items!} />}
      </Container>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Solutions;
