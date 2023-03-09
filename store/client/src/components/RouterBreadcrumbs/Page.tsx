import * as React from 'react';
import {useLocation} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {Typography, Breadcrumbs} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LinkRouter from './LinkRouter';
import breadcrumbNameMap from './breadcrumbNameMap';
import {useAppContext} from '../AppContext';
import {styles} from './styles';

const Page = observer(() => {
  const {productItem} = useAppContext();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
      <LinkRouter underline="hover" sx={styles.notLast} color="inherit" to="/">
        Главная
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography key={to} sx={styles.last}>
            {breadcrumbNameMap.getName(to, productItem)}
          </Typography>
        ) : (
          <LinkRouter underline="hover" sx={styles.notLast} to={to} key={to}>
            {breadcrumbNameMap.getName(to, productItem)}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
});

export default Page;
