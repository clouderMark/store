import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useAppContext} from '../../../components/AppContext';
import CentererImage from '../../../components/CentererImage/CentererImage';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import Info from '../../../components/Info';
import NavLinkButtons from '../../../components/NavLinkButtons/NavLinkButtons';
import {EPath} from '../../../enums/EPath';
import {IAreaResponse} from '../../../types/types';
import Opinion from '../../../components/Opinion/Opinion';
import Header from '../../../components/Header';

const IndustriesSubItem = () => {
  const id: number = Number(useParams().role);
  const {catalog} = useAppContext();
  const [item, setItem] = useState<IAreaResponse>();

  useEffect(() => {
    setItem(() => {
      let item = catalog.subIndustries.find((el) => el.id === id);

      item = item?.info.image ? {
        ...item,
        info: {
          ...item.info,
          image: process.env.REACT_APP_IMG_URL + item.info.image,
        },
      }
        : item;

      return item;
    });
  }, []);

  return (
    <>
      <CentererImage img={item?.headerImage ? process.env.REACT_APP_IMG_URL + item.headerImage : ''} />
      <Breadcrumbs />
      {item ? (
        <>
          <Header item={item} />
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
      {item?.opinion.name && item.opinion.phone ? <Opinion item={item.opinion} /> : null}
    </>
  );
};

export default IndustriesSubItem;
