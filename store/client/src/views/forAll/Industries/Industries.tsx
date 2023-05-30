import {Container} from '@mui/material';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import img from './images/branche-header.webp';
import CentererImage from '../../../components/CentererImage/CentererImage';
import StrongWithTitle from '../../../components/StrongWithTitle/StrongWithTitle';
import CardList from '../../../components/CardList/CardList';
import {useAppContext} from '../../../components/AppContext';
import {EName} from '../../../enums/EName';

const content = {
  p: EName.Industries,
  title: 'Find the right product for your application',
};

const Industries = () => {
  const {catalog} = useAppContext();

  return (
    <>
      <CentererImage img={img} />
      <Breadcrumbs />
      <Container maxWidth={false}>
        <StrongWithTitle content={content} />
        {catalog.industriesFetching ? null : <CardList data={catalog.industries} />}
      </Container>
    </>
  );
};

export default Industries;
