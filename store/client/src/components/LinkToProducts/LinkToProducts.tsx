import {
  Typography,
} from '@mui/material';
import {linkToProducts} from './styles/linkToProducts';
import {content} from './content';
import ContainerWithTwoColumns from '../ContainerWithTwoColumns/ContainerWithTwoColumns';
import NavLinkButtons from '../NavLinkButtons/NavLinkButtons';

const LinkToProducts = () => {
  const firstColumn = () => <Typography sx={linkToProducts.title}>{content.column1.title}</Typography>;

  const secondColumn = () => (
    <>
      <Typography sx={linkToProducts.strong} component="p">
        {content.column2.title}
      </Typography>
      <Typography sx={linkToProducts.p} component="p">
        {content.column2.p}
      </Typography>
    </>
  );

  return (
    <ContainerWithTwoColumns
      firstColumn={firstColumn}
      secondColumn={secondColumn}
      buttons={
        <NavLinkButtons buttons={content.column2.buttons} />
      }
    />
  );
};

export default LinkToProducts;
