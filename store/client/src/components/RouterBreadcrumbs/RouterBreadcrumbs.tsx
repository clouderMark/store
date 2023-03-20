import * as React from 'react';
import {Container, Box} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Page from './Page';

const RouterBreadcrumbs = () => (
  <Container maxWidth={false} sx={{mb: '90px'}}>
    <Box sx={{display: 'flex', flexDirection: 'column', m: '16px 10px'}}>
      <Routes>
        <Route path="*" element={<Page />} />
      </Routes>
    </Box>
  </Container>
);

export default RouterBreadcrumbs;
