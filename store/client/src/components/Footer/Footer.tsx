import {NavLink} from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Link,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
  ListSubheader,
  IconButton,
} from '@mui/material';
import {footer} from './styles/footer';
import {column} from './styles/column';
import {ReactComponent as Icon} from '../../image/Logo.svg';
import styles from './styles/logo.module.css';
import {content} from './content';
import {EPath} from '../../enums/EPath';

const Footer = () => (
  <Container maxWidth={false} component="footer">
    <Box sx={footer}>
      <Box sx={column}>
        <Button component={NavLink} to={EPath.Main} sx={column.button}>
          <Icon className={styles.logo} />
        </Button>
        <Box component="address" sx={footer.column.address}>
          <Typography component="p">
            <Typography sx={[column.title, column.title.thin]} component="strong">
              {content.contact.title}
            </Typography>
            <br />
            {content.contact.address.map((el, i) => (
              <Box key={i} component="span">
                {el.content}
                <br />
              </Box>
            ))}
          </Typography>
          <Typography component="p" sx={column.contacts}>
            {content.contact.contacts.map((el, i) => (
              <Box key={i} component="span">
                {el.content}
                <Link underline="hover" href={`tel: ${el.link}`} sx={column.contacts.link}>
                  <Typography component="span">{el.link}</Typography>
                </Link>
                <br />
              </Box>
            ))}
          </Typography>
        </Box>
      </Box>
      <Box sx={footer.column}>
        {content.blocks.map((block, i) => (
          <List
            sx={column}
            key={i}
            subheader={
              <ListSubheader sx={column.title} component="span">
                {block.title}
              </ListSubheader>
            }
          >
            {block.list.map((el, i) => (
              <ListItem key={i} disablePadding>
                <ListItemButton component={NavLink} to={el.link} sx={column.item}>
                  <ListItemText primary={el.content} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ))}
      </Box>
    </Box>
    <Divider sx={footer.divider} />
    <Box sx={footer.social}>
      <Typography>{content.producer}</Typography>
      <Box>
        {content.social.map((el, i) => (
          <IconButton component="a" href={el.link} key={i} sx={{width: '50px', height: '50px'}}>
            <el.img />
          </IconButton>
        ))}
      </Box>
    </Box>
  </Container>
);

export default Footer;
