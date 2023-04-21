import {Box, List, ListItem, Typography} from '@mui/material';
import {IOpinion} from '../../types/types';
import ContainerWithTwoColumns from '../ContainerWithTwoColumns/ContainerWithTwoColumns';
import {opinion as styles} from './styles/opinion';
import ListWithSubheader from '../ListWithSubheader/ListWithSubheader';

interface IProps {
  item: IOpinion;
}

const Opinion = (props: IProps) => {
  const {item} = props;

  return (
    <Box sx={styles.box}>
      <ContainerWithTwoColumns
        firstColumn={
          <>
            <Typography component="h2" sx={styles.title}>
              {item.title}
            </Typography>
            {item.paragraphs.map((el) => (
              <Typography component="p" key={el.id} sx={{mb: '20px'}}>
                {el.value}
              </Typography>
            ))}
            <ListWithSubheader subheader={item.listTitle} items={item.listItems.map((el) => el.value)} />
          </>
        }
        secondColumn={
          <>
            {item.image ? (
              <Box component="img" src={process.env.REACT_APP_IMG_URL + item.image} sx={{width: '100%', mb: '25px'}} />
            ) : null}
            <Typography sx={styles.p}>Контактное лицо</Typography>
            <Typography sx={styles.p}>{item.name}</Typography>
            <List sx={styles.list}>
              <ListItem disablePadding>
                <Typography>Телефон: </Typography>
                <Typography component="a" href={`tel: ${item.phone}`}>
                  {item.phone}
                </Typography>
              </ListItem>
              <ListItem disablePadding>
                <Typography>Факс: </Typography>
                <Typography component="a" href={`tel: ${item.fax}`}>
                  {item.fax}
                </Typography>
              </ListItem>
              <ListItem disablePadding>
                <Typography>E-Mail: </Typography>
                <Typography component="a" href={`mailto: ${item.email}`}>
                  {item.fax}
                </Typography>
              </ListItem>
            </List>
          </>
        }
        firstColumnWidth={70}
      />
    </Box>
  );
};

export default Opinion;
