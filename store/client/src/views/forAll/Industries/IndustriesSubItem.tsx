import {useParams} from 'react-router-dom';
import {Typography, Box} from '@mui/material';
import {useAppContext} from '../../../components/AppContext';
import CentererImage from '../../../components/CentererImage/CentererImage';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import ContainerWithTwoColumns from '../../../components/ContainerWithTwoColumns/ContainerWithTwoColumns';
import StrongWithTitle from '../../../components/StrongWithTitle/StrongWithTitle';

const IndustriesSubItem = () => {
  const id: number = Number(useParams().role);
  const {currentItem, catalog} = useAppContext();

  const item = catalog.subIndustries.find((el) => el.id === id);

  currentItem.subBranchName = `${id}`;

  return (
    <>
      <CentererImage img={item?.headerImage ? process.env.REACT_APP_IMG_URL + item.headerImage : ''} />
      <Breadcrumbs />
      <ContainerWithTwoColumns
        firstColumn={
          <Box sx={{'& div': {pt: 0}}}>
            <StrongWithTitle
              content={{p: catalog.subIndustries.find((el) => el.id === id)!.name, title: item?.title!}}
            />
          </Box>
        }
        secondColumn={
          <>
            {item?.paragraphs.map((el) => (
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

export default IndustriesSubItem;
