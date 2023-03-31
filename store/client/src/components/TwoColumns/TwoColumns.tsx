import {Box, Typography} from '@mui/material';
import ContainerWithTwoColumns from '../ContainerWithTwoColumns/ContainerWithTwoColumns';
import ListWithSubheader from '../ListWithSubheader/ListWithSubheader';
import {twoColumns as styles} from './styles/twoColumns';
import {h6} from '../../styles/h6';

interface IProps {
  content: {
    column1: {
      // eslint-disable-next-line
      image: any;
    };
    column2: {
      title: {
        top: string;
        bottom: string;
      };
      paragraph?: string;
      list: {
        header: string;
        items: string[];
      };
      p: string;
    };
  };
  buttons: JSX.Element;
}

const TwoColumns = (props: IProps) => {
  const firstColumn = () => <Box component="img" src={props.content.column1.image} sx={styles.image} alt="" />;

  const secondColumn = () => (
    <>
      <Typography component="h2" sx={styles.title}>
        <Typography component="span" sx={h6}>
          {props.content.column2.title.top}
        </Typography>
        {props.content.column2.title.bottom}
      </Typography>
      {props.content.column2.paragraph ? (
        <Typography component="p" sx={styles.p}>
          {props.content.column2.paragraph}
        </Typography>
      ) : null}
      <ListWithSubheader subheader={props.content.column2.list.header} items={props.content.column2.list.items} />
      <Typography component="p" sx={styles.p}>
        {props.content.column2.p}
      </Typography>
    </>
  );

  return <ContainerWithTwoColumns firstColumn={firstColumn} secondColumn={secondColumn} buttons={props.buttons} />;
};

export default TwoColumns;
