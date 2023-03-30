import {NavLink} from 'react-router-dom';
import {Button} from '@mui/material';
import {content} from './content';
import {EPath} from '../../enums/EPath';
import TwoColumns from '../TwoColumns/TwoColumns';

const buttonStyle = {
  textTransform: 'capitalize',
  mr: '10px',
  mb: '10px',
};

const LinkToContactUs = () => {
  const button = () => (
    <>
      <Button
        component={NavLink}
        to={EPath.Contacts}
        variant="contained"
        color="first"
        sx={buttonStyle}
      >
        {content.column2.button.first}
      </Button>
      <Button
        component={NavLink}
        to={EPath.About}
        variant="outlined"
        color="first"
        sx={buttonStyle}
      >
        {content.column2.button.second}
      </Button>
    </>
  );

  return <TwoColumns content={content} buttons={button} />;
};

export default LinkToContactUs;
