import {Alert, Fade} from '@mui/material';
import {alert} from './styles/alert';

interface IProps {
  content: string;
  success: boolean;
}

const AlertLine = (props: IProps) => (
  <Fade in={props.success}>
    <Alert severity="success" sx={alert} elevation={6}>
      {props.content}
    </Alert>
  </Fade>
);

export default AlertLine;
