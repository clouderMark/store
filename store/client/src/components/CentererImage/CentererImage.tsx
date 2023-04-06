import {Box} from '@mui/material';

interface IProps {
  // eslint-disable-next-line
  img: any;
}

const CentererImage = (props: IProps) => (
  <Box sx={{display: 'flex', justifyContent: 'center'}}>
    <Box
      component="img"
      src={props.img}
      sx={{
        width: '100%',
        maxWidth: '1920px',
        objectFit: 'cover',
        maxHeight: '560px',
      }}
    />
  </Box>
);

export default CentererImage;
