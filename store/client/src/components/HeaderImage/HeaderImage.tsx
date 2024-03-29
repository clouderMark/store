import {Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import {Box, Typography, Button} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import image from './image/startseite-header.jpg';
import {header} from './styles/header';
import {queryTablet} from '../commonContent/queryTablet';
import {content} from './content';
import {EPath} from '../../enums/EPath';

const HeaderImage = () => {
  const matchesTablet = useMediaQuery(`(min-width:${queryTablet}px)`, {noSsr: true});

  return (
    <>
      <Box sx={header.container}>
        <Box sx={header.image} component="img" src={image} />
        {matchesTablet ? <Box sx={header.bg} /> : null}
        <Box sx={header.box}>
          <Typography sx={header.p} component="p">
            {content.p}
          </Typography>
          <Typography component="h3">
            {content.strong.map((el, i) => (
              <Fragment key={i}>
                <Typography sx={header.strong} component="strong">
                  {el}
                </Typography>
                <br />
              </Fragment>
            ))}
          </Typography>
          <Button
            component={NavLink}
            to={EPath.Shop}
            sx={header.button}
            variant="contained"
            color="second"
          >
            {content.button.content}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default HeaderImage;
