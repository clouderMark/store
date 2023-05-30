import {theme} from '../../../styles/theme';

const commonStyles = {
  textAlign: 'center',
  color: theme.palette.third.main,
  fontWeight: 300,
};

export const content = {
  top: {
    fontSize: '30px',
  },
  low: {
    fontSize: '18px',
  },
};

Object.assign(content.top, commonStyles);
Object.assign(content.low, commonStyles);
