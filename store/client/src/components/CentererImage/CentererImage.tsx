import {Box} from '@mui/material';

interface IProps {
  img: string;
}

const CentererImage = (props: IProps) => {
  const {img} = props;

  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      {img !== process.env.REACT_APP_IMG_URL ? (
        <Box
          component="img"
          src={img}
          sx={{
            width: '100%',
            maxWidth: '1920px',
            objectFit: 'cover',
            maxHeight: '560px',
          }}
        />
      ) : null}
    </Box>
  );
};

export default CentererImage;
