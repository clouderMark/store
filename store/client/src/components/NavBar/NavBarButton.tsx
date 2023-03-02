import {Button, Box} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {button, box} from './styles/navBarButton';

interface IProps {
  title: string;
  route: string;
  icon: JSX.Element;
}

export const NavBarButton = (props: IProps) => (
  <Button component={NavLink} to={`/${props.route}`} sx={button} color="inherit">
    <Box sx={box} className='box'>
      {props.icon}
    </Box>
    {props.title}
  </Button>
);
