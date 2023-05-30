import bg1 from '../../../image/bg1.png';
import bg2 from '../../../image/bg2.png';
import {theme} from '../../../styles/theme';

export const box = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '281px',
  backgroundColor: theme.palette.first.main,
  backgroundImage: `url(${bg1}), url(${bg2})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '0 -150px, right 0',
  marginTop: '-20px',
};
