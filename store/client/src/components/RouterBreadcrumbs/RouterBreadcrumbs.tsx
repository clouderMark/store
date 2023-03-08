import * as React from 'react';
import {Container, Box} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Page from './Page';

const RouterBreadcrumbs = () => (
  <Container maxWidth={false}>
    <Box sx={{display: 'flex', flexDirection: 'column', width: 360, m: '16px 10px'}}>
      <Routes>
        <Route path="*" element={<Page />} />
      </Routes>
    </Box>
  </Container>
);

export default RouterBreadcrumbs;
