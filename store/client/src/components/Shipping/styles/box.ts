import {theme} from '../../../styles/theme';

export const box = {
  minHeight: '569px',
  backgroundColor: '#fbfbfb',
  padding: '163px 0 124px',
  content: {
    top: {
      fontWeight: 500,
      textTransform: 'uppercase',
      color: theme.palette.first.main,
    },
    title: {
      textAlign: 'center',
      marginBottom: '72px',
      fontWeight: 300,
      fontSize: '40px',
    },
    images: {
      display: 'flex',
    },
    img: {
      width: '153px',
      height: '135px',
    },
  },
};

const common = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

Object.assign(box, common);
Object.assign(box.content.title, common);
