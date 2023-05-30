import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {Container} from '@mui/material';
import {useAppContext} from '../../../components/AppContext';
import CentererImage from '../../../components/CentererImage/CentererImage';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import CardList from '../../../components/CardList/CardList';
import Info from '../../../components/Info';
import NavLinkButtons from '../../../components/NavLinkButtons/NavLinkButtons';
import {EPath} from '../../../enums/EPath';
import {IAreaResponse} from '../../../types/types';
import Opinion from '../../../components/Opinion/Opinion';
import Header from '../../../components/Header';

const IndustriesItem = () => {
  const id: number = Number(useParams().id);
  const {catalog} = useAppContext();
  const [item, setItem] = useState<IAreaResponse>();
  const [subIndustries, setSubIndustries] = useState<IAreaResponse[]>();

  useEffect(() => {
    setItem(() => {
      let item = catalog.industries.find((el) => el.id === id);

      item = item?.info.image ? {
        ...item,
        info: {
          ...item.info,
          image: process.env.REACT_APP_IMG_URL + item.info.image,
        },
      } : item;

      return item;
    });
    setSubIndustries(catalog.subIndustries.filter((el) => el.industryId === id));
  }, [id]);

  return (
    <>
      <CentererImage img={item?.headerImage ? process.env.REACT_APP_IMG_URL + item.headerImage : ''} />
      <Breadcrumbs />
      {item ? (
        <Header item={item}/>
      ) : null}
      {subIndustries?.length ? (
        <Container maxWidth={false}>
          <CardList data={subIndustries} />
        </Container>
      ) : null}
      {item?.info ? (
        <Info
          item={item.info}
          buttons={
            <NavLinkButtons
              buttons={[{content: 'contact us', color: 'first', variant: 'contained', to: EPath.Contacts}]}
              sx={{mt: '40px', textTransform: 'capitalize'}}
            />
          }
        />
      ) : null}
      {item?.opinion.name && item.opinion.phone ? <Opinion item={item.opinion} /> : null}
    </>
  );
};

export default IndustriesItem;
