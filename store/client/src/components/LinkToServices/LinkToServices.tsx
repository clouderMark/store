import {NavLink} from 'react-router-dom';
import {Box, Typography, Button} from '@mui/material';
import ContainerWithTwoColumns from '../ContainerWithTwoColumns/ContainerWithTwoColumns';
import ListWithSubheader from '../ListWithSubheader/ListWithSubheader';
import {linkToServices as styles} from './styles/linkToServices';
import {content} from './content';
import {h6} from '../../styles/h6';

const LinkToServices = () => {
  const firstColumn = () => <Box component="img" src={content.column1.image} sx={styles.image} />;

  const secondColumn = () => (
    <>
      <Typography component="h2" sx={styles.title}>
        <Typography component="span" sx={h6}>
          {content.conlumn2.title.top}
        </Typography>
        {content.conlumn2.title.bottom}
      </Typography>
      <ListWithSubheader subheader={content.conlumn2.list.header} items={content.conlumn2.list.items} />
      <Typography component="p" sx={styles.p}>
        {content.conlumn2.p}
      </Typography>
    </>
  );

  const button = () => (
    <Button component={NavLink} to={'/'} variant="contained" color="first" sx={{textTransform: 'capitalize'}}>
      {content.conlumn2.title.top}
    </Button>
  );

  return <ContainerWithTwoColumns firstColumn={firstColumn} secondColumn={secondColumn} buttons={button} />;
};

export default LinkToServices;
