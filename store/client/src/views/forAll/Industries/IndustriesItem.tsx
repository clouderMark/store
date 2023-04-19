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
import Info from '../../../components/Info';
import NavLinkButtons from '../../../components/NavLinkButtons/NavLinkButtons';
import {EPath} from '../../../enums/EPath';

const IndustriesItem = () => {
  const id: number = Number(useParams().id);
  const {catalog} = useAppContext();

  const item = catalog.industries.find((el) => el.id === id);

  if (item?.info.image) {
    const src = process.env.REACT_APP_IMG_URL + item.info.image.replace(`${process.env.REACT_APP_IMG_URL}`, '');

    item.info.image = src;
  }

  return (
    <>
      <CentererImage img={item?.headerImage ? process.env.REACT_APP_IMG_URL + item.headerImage : ''} />
      <Breadcrumbs />
      <ContainerWithTwoColumns
        firstColumn={
          <Box sx={{'& div': {pt: 0}}}>
            <StrongWithTitle
              content={{p: catalog.industries.find((el) => el.id === id)?.name ?? '', title: item?.title ?? ''}}
            />
          </Box>
        }
        secondColumn={
          <>
            {item?.paragraphs
              ? item.paragraphs.map((el) => (
                <Typography key={el.id} sx={{mb: '10px'}}>
                  {el.value}
                </Typography>
              ))
              : null}
            <Typography />
          </>
        }
      />
      {catalog.subIndustries.length ? (
        <Container maxWidth={false}>
          <CardList data={catalog.subIndustries.filter((el) => el.industryId === id)} />
        </Container>
      ) : null}
      {item?.info ? (
        <Info
          item={item?.info}
          buttons={
            <NavLinkButtons
              buttons={[{content: 'contact us', color: 'first', variant: 'contained', to: EPath.Contacts}]}
              sx={{mt: '40px', textTransform: 'capitalize'}}
            />
          }
        />
      ) : null}
      <Contact />
      <Newsletter />
      <Footer />
    </>
  );
};

export default IndustriesItem;
