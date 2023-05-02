import {TouchEvent, Dispatch, SetStateAction, MouseEvent} from 'react';

const minSwipeDistance = 50;

export const onTouchStart = (
  e: TouchEvent,
  setStart: Dispatch<SetStateAction<number | null>>,
  setEnd: Dispatch<SetStateAction<number | null>>,
) => {
  setEnd(null);
  setStart(e.targetTouches[0].clientX);
};

export const onTouchMove = (e: TouchEvent, setEnd: Dispatch<SetStateAction<number | null>>) =>
  setEnd(e.targetTouches[0].clientX);

export const onTouchEnd = (
  start: number | null,
  end: number | null,
  setCount: Dispatch<SetStateAction<number>>,
  count: number,
  quantitySteps: number,
) => {
  if (!start || !end) return;
  const distance = start - end;
  const isLeftSwipe = distance > minSwipeDistance;
  const isRightSwipe = distance < -minSwipeDistance;

  if (isLeftSwipe) {
    setCount(count <= quantitySteps - 1 ? count + 1 : 1);
  }

  if (isRightSwipe) {
    setCount(count >= 2 ? count - 1 : quantitySteps);
  }
};

export const handleClick = (
  e: MouseEvent<HTMLButtonElement>,
  setCount: Dispatch<SetStateAction<number>>,
  count: number,
  quantitySteps: number,
) => {
  const {name} = e.currentTarget;

  if (name === 'next') {
    setCount(count <= quantitySteps - 1 ? count + 1 : 1);
  } else if (name === 'back') {
    setCount(count >= 2 ? count - 1 : quantitySteps);
  } else {
    setCount(+name + 1);
  }
};
