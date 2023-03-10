const searchQuery = '1130';

export const bar = {
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    mb: '32px',
  },
  textFiled: {
    width: '296px',
    height: '55px',
    input: {
      color: '#707070',
      fontWeight: 400,
    },
    [`@media (max-width: ${searchQuery}px)`]: {
      width: '27.5%',
    },
  },
  boxInBox: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    color: '#6f6f6f',
    fontSize: '18px',
  },
};
