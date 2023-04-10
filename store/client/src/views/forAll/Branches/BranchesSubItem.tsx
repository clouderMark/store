import {useParams} from 'react-router-dom';
import {useAppContext} from '../../../components/AppContext';
import CentererImage from '../../../components/CentererImage/CentererImage';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';

const BranchesSubItem = () => {
  const id: number = Number(useParams().role);
  const {currentItem} = useAppContext();

  currentItem.subBranchName = `${id}`;

  return (
    <>
      <CentererImage img={''} />
      <Breadcrumbs />
    </>
  );
};

export default BranchesSubItem;
