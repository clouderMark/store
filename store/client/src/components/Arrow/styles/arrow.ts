const color = '#6f6f6f';
const size = 40;
const weight = 1.5;

export const arrow = {
  position: 'relative',
  height: `${size}px`,

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    width: `${size}px`,
    height: `${size}px`,
    border: `${weight}px solid ${color}`,
    borderRadius: '50%',
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    top: '14px',
    left: '12px',
    width: '13px',
    height: '13px',
    borderRight: `${weight}px solid ${color}`,
    borderTop: `${weight}px solid ${color}`,
    transform: 'rotate(45deg)',
  },
};
