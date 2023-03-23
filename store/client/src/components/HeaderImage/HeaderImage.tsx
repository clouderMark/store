import React from 'react';
import {NavLink} from 'react-router-dom';
import {Box, Typography, Button} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import image from './image/startseite-header.jpg';
import {header} from './styles/header';
import {queryTablet} from '../../commonContent/queryTablet';
import {content} from './content';

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
              <React.Fragment key={i}>
                <Typography sx={header.strong} component="strong">
                  {el}
                </Typography>
                <br />
              </React.Fragment>
            ))}
          </Typography>
          <Button component={NavLink} to={`/${content.button.to}`} sx={header.button}>
            {content.button.content}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default HeaderImage;
