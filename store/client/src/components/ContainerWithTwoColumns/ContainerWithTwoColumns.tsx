import {Container, Box} from '@mui/material';
import {containerWithTwoColumns as styles, queryMobile} from './styles/containerWithTwoColumns';

interface IProps {
  firstColumn: JSX.Element;
  secondColumn: JSX.Element;
  buttons?: JSX.Element;
  firstColumnWidth?: number;
}

const ContainerWithTwoColumns = (props: IProps) => {
  const {firstColumnWidth = 40} = props;

  return (
    <Container sx={styles.container} maxWidth={false}>
      <Box
        sx={{
          width: `${firstColumnWidth}%`,

          [`@media (max-width: ${queryMobile}px)`]: {
            width: '100%',
            marginBottom: '16px',
          },
        }}
      >
        {props.firstColumn}
      </Box>
      <Box
        sx={{
          width: `${90 - firstColumnWidth}%`,

          [`@media (max-width: ${queryMobile}px)`]: {
            width: '100%',
          },
        }}
      >
        {props.secondColumn}
        <Box>{props.buttons}</Box>
      </Box>
    </Container>
  );
};

export default ContainerWithTwoColumns;
