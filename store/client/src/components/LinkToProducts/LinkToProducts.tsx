import {NavLink} from 'react-router-dom';
import {Typography, Button} from '@mui/material';
import {linkToProducts} from './styles/linkToProducts';
import {content} from './content';
import ContainerWithTwoColumns from '../ContainerWithTwoColumns/ContainerWithTwoColumns';
import {EPath} from '../../enums/EPath';

const LinkToProducts = () => {
  const firstColumn = () => <Typography sx={linkToProducts.title}>{content.row1.title}</Typography>;

  const secondColumn = () => (
    <>
      <Typography sx={linkToProducts.strong} component="p">
        {content.row2.title}
      </Typography>
      <Typography sx={linkToProducts.p} component="p">
        {content.row2.p}
      </Typography>
    </>
  );

  const button = () => (
    <Button component={NavLink} to={EPath.Shop} variant="contained" color="first">
      {content.row2.button.content}
    </Button>
  );

  return (
    <ContainerWithTwoColumns
      firstColumn={firstColumn}
      secondColumn={secondColumn}
      buttons={button}
    />
  );
};

export default LinkToProducts;
