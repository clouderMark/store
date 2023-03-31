import {Container, Box, Typography} from '@mui/material';
import {centeredContainer} from './styles/centeredContainer';
import {h6} from '../../styles/h6';
import {ICentererContainer} from '../../types/types';

interface IProps {
  content: ICentererContainer
}

const CentererContainer = (props: IProps) => (
  <Box component="section" sx={centeredContainer}>
    <Container sx={centeredContainer.container}>
      <Typography component="p" sx={h6}>
        {props.content.title}
      </Typography>
      <Typography component="h3" sx={centeredContainer.header}>
        {props.content.header}
      </Typography>
      <Typography component="p" sx={centeredContainer.content}>
        {props.content.content}
      </Typography>
      <Typography component="p" sx={centeredContainer.images}>
        {props.content.images.map((img, i) => (
          <Box component="img" src={img.img} alt={img.alt} key={i} />
        ))}
      </Typography>
    </Container>
    ;
  </Box>
);

export default CentererContainer;
