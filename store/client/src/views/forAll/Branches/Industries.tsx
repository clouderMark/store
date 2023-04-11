import {useState, useEffect} from 'react';
import {Container} from '@mui/material';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import img from './images/branche-header.webp';
import CentererImage from '../../../components/CentererImage/CentererImage';
import StrongWithTitle from '../../../components/StrongWithTitle/StrongWithTitle';
import BranchesList from '../../../components/BranchesList/BranchesList';
import Newsletter from '../../../components/Newsletter/Newsletter';
import Footer from '../../../components/Footer/Footer';
import {fetchIndustries} from '../../../http/catalogAPI';
import {IFetchIndystry} from '../../../types/types';

const content = {
  p: 'Отрасли',
  title: 'Find the right product for your application',
};

const Industries = () => {
  const [industries, setIndustries] = useState<IFetchIndystry[] | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchIndustries()
      .then((data) => setIndustries(data))
      .finally(() => setFetching(false));
  }, []);

  return (
    <>
      <CentererImage img={img} />
      <Breadcrumbs />
      <Container maxWidth={false}>
        <StrongWithTitle content={content} />
        {fetching ? null : (
          <BranchesList data={industries!} />
        )}
      </Container>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Industries;
