import {Button, Box} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {button, box} from './styles/navBarButton';

interface IProps {
  title: string;
  route: string;
  icon: JSX.Element;
}

export const NavBarButton = (props: IProps) => {
  const {title, route, icon} = props;

  return (
    <Button component={NavLink} to={route} sx={button} color="inherit">
      <Box sx={box} className="box">
        {icon}
      </Box>
      {title}
    </Button>
  );
};

export default NavBarButton;
