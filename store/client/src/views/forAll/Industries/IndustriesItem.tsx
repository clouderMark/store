import {useParams} from 'react-router-dom';
import {Typography, Box, Container} from '@mui/material';
import {useAppContext} from '../../../components/AppContext';
import CentererImage from '../../../components/CentererImage/CentererImage';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import ContainerWithTwoColumns from '../../../components/ContainerWithTwoColumns/ContainerWithTwoColumns';
import StrongWithTitle from '../../../components/StrongWithTitle/StrongWithTitle';
import CardList from '../../../components/CardList/CardList';
import Contact from '../../../components/Contact/Contact';
import Newsletter from '../../../components/Newsletter/Newsletter';
import Footer from '../../../components/Footer/Footer';

const IndustriesItem = () => {
  const id: number = Number(useParams().id);
  const {catalog} = useAppContext();

  const item = catalog.industries.find((el) => el.id === id);

  return (
    <>
      <CentererImage img={item?.headerImage ? process.env.REACT_APP_IMG_URL + item.headerImage : ''} />
      <Breadcrumbs />
      <ContainerWithTwoColumns
        firstColumn={
          <Box sx={{'& div': {pt: 0}}}>
            <StrongWithTitle
              content={{p: catalog.industries.find((el) => el.id === id)!.name, title: item?.title!}}
            />
          </Box>
        }
        secondColumn={
          <>
            {item?.paragraphs ? item.paragraphs.map((el) => (
              <Typography key={el.id} sx={{mb: '10px'}}>
                {el.value}
              </Typography>
            )) : null}
            <Typography />
          </>
        }
      />
      <Container maxWidth={false}>
        <CardList data={catalog.subIndustries.filter((el) => el.industryId === id)} />
      </Container>
      <Contact />
      <Newsletter />
      <Footer />
    </>
  );
};

export default IndustriesItem;
