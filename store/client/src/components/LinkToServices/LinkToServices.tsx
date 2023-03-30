import {NavLink} from 'react-router-dom';
import {Box, Typography, Button, List, ListSubheader, ListItem, ListItemText} from '@mui/material';
import ContainerWithTwoColumns from '../ContainerWithTwoColumns/ContainerWithTwoColumns';
import {linkToServices as styles} from './styles/linkToServices';
import {content} from './content';
import {bullet} from '../commonContent/bullet';

const LinkToServices = () => {
  const firstColumn = () => <Box component="img" src={content.column1.image} sx={styles.image} />;

  const secondColumn = () => (
    <>
      <Typography component="h2" sx={styles.title}>
        <Typography component="span" sx={styles.titleSpan}>
          {content.conlumn2.title.top}
        </Typography>
        {content.conlumn2.title.bottom}
      </Typography>
      <List
        subheader={
          <ListSubheader component="p" sx={styles.item}>
            {content.conlumn2.list.header}
          </ListSubheader>
        }
      >
        {content.conlumn2.list.items.map((el, i) => (
          <ListItem disablePadding key={i} sx={[styles.item, bullet]}>
            <ListItemText primary={el} />
          </ListItem>
        ))}
      </List>
      <Typography component="p" sx={styles.p}>
        {content.conlumn2.p}
      </Typography>
    </>
  );

  const button = () => (
    <Button component={NavLink} to={'/'} variant="contained" color="first" sx={{textTransform: 'capitalize'}}>
      {content.conlumn2.title.top}
    </Button>
  );

  return <ContainerWithTwoColumns firstColumn={firstColumn} secondColumn={secondColumn} buttons={button} />;
};

export default LinkToServices;
