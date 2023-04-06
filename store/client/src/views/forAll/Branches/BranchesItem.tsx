import {useParams} from 'react-router-dom';
import {useAppContext} from '../../../components/AppContext';
import CentererImage from '../../../components/CentererImage/CentererImage';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';

const BranchesItem = () => {
  const id: number = Number(useParams().id);
  const {catalog, currentItem} = useAppContext();

  const branch = catalog.industries.find((el) => el.id === id);

  currentItem.branchName = branch!.name;

  return (
    <>
      <CentererImage img={branch?.headerImage ? process.env.REACT_APP_IMG_URL + branch.headerImage : ''} />
      <Breadcrumbs />
    </>
  );
};

export default BranchesItem;
