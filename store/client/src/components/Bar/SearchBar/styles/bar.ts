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
    fontSize: '18px',
  },
};
