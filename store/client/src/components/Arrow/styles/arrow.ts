export const arrow = {
  make(color: string, direction: 'left' | 'right', size: number) {
    let rotateTo: number;
    const top = '38%';
    let left: string;
    const weight = (size / 100) * 5.2;
    const border = (size / 100) * 27;

    if (direction === 'right') {
      rotateTo = 45;
      left = '33%';
    } else {
      rotateTo = -135;
      left = '42%';
    }

    return {
      display: 'block',
      position: 'relative',
      height: `${size}px`,
      width: `${size}px`,

      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        border: `${weight}px solid ${color}`,
        borderRadius: '50%',
      },

      '&::after': {
        content: '""',
        position: 'absolute',
        top: top,
        left: left,
        width: `${border}px`,
        height: `${border}px`,
        borderRight: `${weight}px solid ${color}`,
        borderTop: `${weight}px solid ${color}`,
        transform: `rotate(${rotateTo}deg)`,
      },
    };
  },
};
