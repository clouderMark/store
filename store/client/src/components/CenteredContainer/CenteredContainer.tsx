import {Container, Box, Typography} from '@mui/material';
import {centeredContainer} from './styles/centeredContainer';
import {h6} from '../../styles/h6';

interface IImages {
  img: any; //eslint-disable-line
  alt: string;
}

interface IProps {
  title: string;
  header: string;
  content: string;
  images: IImages[];
}

const CenteredContainer = (props: IProps) => (
  <Box component="section" sx={centeredContainer}>
    <Container sx={centeredContainer.container}>
      <Typography component="p" sx={h6}>
        {props.title}
      </Typography>
      <Typography component="h3" sx={centeredContainer.header}>{props.header}</Typography>
      <Typography component="p" sx={centeredContainer.content}>{props.content}</Typography>
      <Typography component="p" sx={centeredContainer.images}>
        {props.images.map((img, i) => (
          <Box component="img" src={img.img} alt={img.alt} key={i} />
        ))}
      </Typography>
    </Container>
    ;
  </Box>
);

export default CenteredContainer;
