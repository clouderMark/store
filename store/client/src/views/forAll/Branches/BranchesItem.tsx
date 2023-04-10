import {useParams} from 'react-router-dom';
import {Typography, Box} from '@mui/material';
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
          <Box sx={{'& div': {pt: 0}}}>
            <StrongWithTitle content={{p: currentItem.branchName, title: branch?.title!}} />
          </Box>
        }
        secondColumn={
          <>
            {branch?.paragraphs.map((el) => (
              <Typography key={el.id} sx={{mb: '10px'}}>
                {el.value}
              </Typography>
            ))}
            <Typography />
          </>
        }
      />
    </>
  );
};

export default BranchesItem;
