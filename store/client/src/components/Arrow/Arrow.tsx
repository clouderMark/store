import {Typography} from '@mui/material';
import {arrow} from './styles/arrow';

interface IProps {
  color: string;
  direction: 'left' | 'right';
  size: 'm' | 'l' | 's';
}

const Arrow = (props: IProps) => <Typography component="i" sx={arrow.make(props.color, props.direction, props.size)} />;

export default Arrow;
