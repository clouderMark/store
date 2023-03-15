const commonStyles = {
  textAlign: 'center',
  color: 'white',
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
