import {NavLink} from 'react-router-dom';
import {Box, Button, List, ListItem, Typography} from '@mui/material';
import {IOpinion} from '../../types/types';
import ContainerWithTwoColumns from '../ContainerWithTwoColumns/ContainerWithTwoColumns';
import {opinion as styles} from './styles/opinion';
import ListWithSubheader from '../ListWithSubheader/ListWithSubheader';
import {EPath} from '../../enums/EPath';

interface IProps {
  item: IOpinion;
}

const Opinion = (props: IProps) => {
  const {item} = props;
  // prettier-ignore

  return (
    <>
      {item.title ||
      item.name ||
      item.image ||
      item.email ||
      item.fax ||
      item.listTitle ||
      item.phone ||
      item.listItems.length ||
      item.paragraphs.length ? (
          <Box sx={styles.box}>
            <ContainerWithTwoColumns
              firstColumn={
                <>
                  {item.title ? (
                    <Typography component="h2" sx={styles.title}>
                      {item.title}
                    </Typography>
                  ) : null}
                  {item.paragraphs.map((el) => (
                    <Typography component="p" key={el.id} sx={{mb: '20px'}}>
                      {el.value}
                    </Typography>
                  ))}
                  {item.listTitle || item.listItems.length ? (
                    <ListWithSubheader subheader={item.listTitle} items={item.listItems.map((el) => el.value)} />
                  ) : null}
                  <Button component={NavLink} to={EPath.Contacts} color='first' variant='contained' sx={{mt: '30px'}}>
                    Свяжитесь с нами</Button>
                </>
              }
              secondColumn={
                <>
                  {item.image ? (
                    <Box
                      component="img"
                      src={process.env.REACT_APP_IMG_URL + item.image}
                      sx={{width: '100%', mb: '25px'}}
                    />
                  ) : null}
                  {item.name ? (
                    <>
                      <Typography sx={styles.p}>Контактное лицо</Typography>
                      <Typography sx={styles.p}>{item.name}</Typography>
                    </>
                  ) : null}
                  {item.phone || item.fax || item.email ? (
                    <List sx={styles.list}>
                      {item.phone ? (
                        <ListItem disablePadding>
                          <Typography>Телефон: </Typography>
                          <Typography component="a" href={`tel: ${item.phone}`}>
                            {item.phone}
                          </Typography>
                        </ListItem>
                      ) : null}
                      {item.fax ? (
                        <ListItem disablePadding>
                          <Typography>Факс: </Typography>
                          <Typography component="a" href={`tel: ${item.fax}`}>
                            {item.fax}
                          </Typography>
                        </ListItem>
                      ) : null}
                      {item.email ? (
                        <ListItem disablePadding>
                          <Typography>E-Mail: </Typography>
                          <Typography component="a" href={`mailto: ${item.email}`}>
                            {item.fax}
                          </Typography>
                        </ListItem>
                      ) : null}
                    </List>
                  ) : null}
                </>
              }
              firstColumnWidth={70}
            />
          </Box>
        ) : null}
    </>
  );
};

export default Opinion;
