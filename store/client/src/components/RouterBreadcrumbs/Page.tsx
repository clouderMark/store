import * as React from 'react';
import {useLocation} from 'react-router-dom';
import {Typography, Breadcrumbs} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LinkRouter from './LinkRouter';
import breadcrumbNameMap from './breadcrumbNameMap';

const Page = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
      <LinkRouter underline="hover" color="inherit" to="/">
        Главная
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap.getKey(to)}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap.getKey(to)}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
};

export default Page;
