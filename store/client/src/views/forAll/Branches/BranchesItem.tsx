import {useParams} from 'react-router-dom';
import {Typography} from '@mui/material';
import {useAppContext} from '../../../components/AppContext';
import CentererImage from '../../../components/CentererImage/CentererImage';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import ContainerWithTwoColumns from '../../../components/ContainerWithTwoColumns/ContainerWithTwoColumns';
import StrongWithTitle from '../../../components/StrongWithTitle/StrongWithTitle';

const BranchesItem = () => {
  const id: number = Number(useParams().id);
  const {catalog, currentItem} = useAppContext();

  const branch = catalog.industries.find((el) => el.id === id);

  currentItem.branchName = branch!.name;

  return (
    <>
      <CentererImage img={branch?.headerImage ? process.env.REACT_APP_IMG_URL + branch.headerImage : ''} />
      <Breadcrumbs />
      <ContainerWithTwoColumns
        firstColumn={
          <StrongWithTitle
            content={{p: currentItem.branchName, title: branch?.title!}}
          />
        }
        secondColumn={
          <>
            <Typography></Typography>
          </>
        }
      />
    </>
  );
};

export default BranchesItem;
