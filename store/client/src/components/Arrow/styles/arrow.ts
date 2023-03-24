export const arrow = {
  make(color: string, direction: 'left' | 'right', format: 'm' | 'l') {
    let rotateTo: number;
    let size: number;
    let top: number;
    let left: number;
    let weight = 1.5;

    if (direction === 'right') {
      rotateTo = 45;

      if (format === 'm') {
        size = 40;
        top = 14;
        left = 12;
      } else {
        size = 48;
        top = 19;
        left = 16;
        weight = 2.5;
      }
    } else {
      rotateTo = -135;

      if (format === 'm') {
        size = 40;
        top = 14;
        left = 15;
      } else {
        size = 48;
        top = 18;
        left = 20;
        weight = 2.5;
      }
    }

    return (
      {
        display: 'block',
        position: 'relative',
        height: `${size}px`,
        width: `${size}px`,

        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          width: `${size}px`,
          height: `${size}px`,
          border: `${weight}px solid ${color}`,
          borderRadius: '50%',
        },

        '&::after': {
          content: '""',
          position: 'absolute',
          top: `${top}px`,
          left: `${left}px`,
          width: '13px',
          height: '13px',
          borderRight: `${weight}px solid ${color}`,
          borderTop: `${weight}px solid ${color}`,
          transform: `rotate(${rotateTo}deg)`,
        },
      }
    );
  },
};
