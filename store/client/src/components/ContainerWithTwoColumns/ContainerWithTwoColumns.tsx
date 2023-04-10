import {Container, Box} from '@mui/material';
import {containerWithTwoColumns as styles} from './styles/containerWithTwoColumns';

interface IProps {
  firstColumn: JSX.Element;
  secondColumn: JSX.Element;
  buttons?: JSX.Element;
}

const ContainerWithTwoColumns = (props: IProps) => (
  <Container sx={styles.container} maxWidth={false}>
    <Box sx={styles.column1}>{props.firstColumn}</Box>
    <Box sx={styles.column2}>
      {props.secondColumn}
      <Box>
        {props.buttons}
      </Box>
    </Box>
  </Container>
);

export default ContainerWithTwoColumns;
