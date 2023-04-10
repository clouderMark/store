import * as React from 'react';
import {Container, Box} from '@mui/material';
import Page from './Page';

const Breadcrumbs = () => (
  <Container maxWidth={false} sx={{mb: '90px'}}>
    <Box sx={{display: 'flex', flexDirection: 'column', m: '16px 10px'}}>
      <Page />
    </Box>
  </Container>
);

export default Breadcrumbs;
