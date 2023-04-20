import {Box, Typography} from '@mui/material';
import {strongWithTitle as styles} from './styles/strongWithTitle';
import {h6} from '../../styles/h6';

interface IProps {
  content: {
    p: string;
    title: string;
  };
  // eslint-disable-next-line
  titleComponent?: any;
}

const StrongWithTitle = (props: IProps) => {
  const {content, titleComponent = 'h1'} = props;

  return (
    <Box sx={styles.box}>
      <Typography component="p">
        <Typography component="strong" sx={h6}>
          {content.p}
        </Typography>
      </Typography>
      <Typography component={titleComponent} sx={styles.title}>
        {content.title}
      </Typography>
    </Box>
  );
};

export default StrongWithTitle;
