import {useParams} from 'react-router-dom';
import {useAppContext} from '../../../components/AppContext';
import CentererImage from '../../../components/CentererImage/CentererImage';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';

const BranchesSubItem = () => {
  const id: number = Number(useParams().role);
  const {currentItem, catalog} = useAppContext();

  const item = catalog.subIndustries.find((el) => el.id === id);

  currentItem.subBranchName = `${id}`;

  return (
    <>
      <CentererImage img={item?.headerImage ? process.env.REACT_APP_IMG_URL + item.headerImage : ''} />
      <Breadcrumbs />
    </>
  );
};

export default BranchesSubItem;
