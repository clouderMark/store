import {NavLink} from 'react-router-dom';
import {Button} from '@mui/material';
import {IButtons} from '../../types/types';

interface IProps {
  buttons: IButtons[];
  // eslint-disable-next-line
  sx?: any;
}

const NavLinkButtons = (props: IProps) => (
  <>
    {props.buttons.map((el, i) => (
      <Button component={NavLink} to={el.to} variant={el.variant} color={el.color} sx={props.sx} key={i}>
        {el.content}
      </Button>
    ))}
  </>
);

export default NavLinkButtons;
