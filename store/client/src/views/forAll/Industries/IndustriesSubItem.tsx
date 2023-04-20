import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {Typography, Box} from '@mui/material';
import {useAppContext} from '../../../components/AppContext';
import CentererImage from '../../../components/CentererImage/CentererImage';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import ContainerWithTwoColumns from '../../../components/ContainerWithTwoColumns/ContainerWithTwoColumns';
import StrongWithTitle from '../../../components/StrongWithTitle/StrongWithTitle';
import Contact from '../../../components/Contact/Contact';
import Newsletter from '../../../components/Newsletter/Newsletter';
import Footer from '../../../components/Footer/Footer';
import Info from '../../../components/Info';
import NavLinkButtons from '../../../components/NavLinkButtons/NavLinkButtons';
import {EPath} from '../../../enums/EPath';
import {IAreaResponse} from '../../../types/types';

const IndustriesSubItem = () => {
  const id: number = Number(useParams().role);
  const {catalog} = useAppContext();
  const [item, setItem] = useState<IAreaResponse | undefined>(catalog.subIndustries.find((el) => el.id === id));

  if (item?.info.image) {
    useEffect(() => {
      setItem({
        ...item,
        info: {
          ...item.info,
          image: process.env.REACT_APP_IMG_URL + item.info.image,
        },
      });
    }, []);
  }

  return (
    <>
      <CentererImage img={item?.headerImage ? process.env.REACT_APP_IMG_URL + item.headerImage : ''} />
      <Breadcrumbs />
      {item ? (
        <>
          <ContainerWithTwoColumns
            firstColumn={
              <Box sx={{'& div': {pt: 0}}}>
                <StrongWithTitle content={{p: item.name, title: item.title}} />
              </Box>
            }
            secondColumn={
              <>
                {item.paragraphs.map((el) => (
                  <Typography key={el.id} sx={{mb: '10px'}}>
                    {el.value}
                  </Typography>
                ))}
                <Typography />
              </>
            }
          />
          <Info
            item={item.info}
            buttons={
              <NavLinkButtons
                buttons={[{content: 'contact us', color: 'first', variant: 'contained', to: EPath.Contacts}]}
                sx={{mt: '40px', textTransform: 'capitalize'}}
              />
            }
          />
        </>
      ) : null}
      <Contact />
      <Newsletter />
      <Footer />
    </>
  );
};

export default IndustriesSubItem;