import {NavLink} from 'react-router-dom';
import {Box, Container, List, ListItem, ListItemButton, Typography} from '@mui/material';
import {linkList} from './styles/linkList';
import logo1 from './images/neu_MadeInGermanyRechts-250x105.png';
import logo2 from './images/TUeV_Sued_logo-100x100.png';
import Arrow from '../Arrow/Arrow';
import {content} from './content';

const LinkList = () => (
  <Box sx={linkList}>
    <Container maxWidth={false}>
      <List sx={linkList.list}>
        {content.list.map((item, i) => (
          <ListItem sx={linkList.item} key={i}>
            <ListItemButton component={NavLink} to={`/${item.to}`} sx={linkList.itemButton}>
              <Typography sx={linkList.title} component="h2">
                <Typography component="span" sx={linkList.titleSpan}>
                  {item.content.top}
                </Typography>
                {item.content.bottom}
              </Typography>
              <Arrow/>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem sx={linkList.logoItem}>
          <Box sx={linkList.box}>
            <Typography component="span" sx={linkList.titleSpan}>
              {content.logoItem.content}
            </Typography>
            <Box component="p" sx={linkList.logoContainer}>
              <Box component="img" src={logo1} sx={linkList.logo1} />
              <Box component="img" src={logo2} sx={linkList.logo2} />
            </Box>
          </Box>
        </ListItem>
      </List>
    </Container>
  </Box>
);

export default LinkList;
