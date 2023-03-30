import {NavLink} from 'react-router-dom';
import {Button} from '@mui/material';
import {content} from './content';
import {EPath} from '../../enums/EPath';
import TwoColumns from '../TwoColumns/TwoColumns';

const LinkToServices = () => {
  const button = () => (
    <Button
      component={NavLink}
      to={EPath.Services}
      variant="contained"
      color="first"
      sx={{textTransform: 'capitalize'}}
    >
      {content.column2.title.top}
    </Button>
  );

  return <TwoColumns content={content} buttons={button} />;
};

export default LinkToServices;
