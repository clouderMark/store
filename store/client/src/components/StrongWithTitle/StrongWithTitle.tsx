import {Box, Typography} from '@mui/material';
import {strongWithTitle as styles} from './styles/strongWithTitle';
import {h6} from '../../styles/h6';

interface IProps {
  content: {
    p: string;
    title: string;
  };
}

const StrongWithTitle = (props: IProps) => (
  <Box sx={styles.box}>
    <Typography component="p">
      <Typography component="strong" sx={h6}>
        {props.content.p}
      </Typography>
    </Typography>
    <Typography component="h1" sx={styles.title}>
      {props.content.title}
    </Typography>
  </Box>
);

export default StrongWithTitle;
