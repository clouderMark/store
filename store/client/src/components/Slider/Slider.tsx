import {MouseEvent, useState, createRef, useEffect} from 'react';
import {Container, Box, Typography, IconButton, List, ListItem} from '@mui/material';
import {slider} from './styles/slider';
import Arrow from '../Arrow/Arrow';

const content = {
  title: {
    top: 'Products',
    bottom: 'Here you can find our latest products.',
  },
  list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

const Slider = () => {
  const amountItems = Math.ceil(content.list.length / 2);
  const [count, setCount] = useState(1);
  const [translateTo, setTranslateTo] = useState(0);
  const refComponent = createRef<HTMLLIElement>();

  useEffect(() => {
    if (refComponent.current) {
      const {width} = refComponent.current.getBoundingClientRect();
      const margin = parseInt(getComputedStyle(refComponent.current).marginLeft);

      setTranslateTo((width + margin) * 2);
    }
  }, [refComponent]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const {name} = event.currentTarget;

    if (name === 'next') {
      setCount(count <= amountItems - 1 ? count + 1 : 1);
    } else {
      setCount(count >= 2 ? count - 1 : amountItems);
    }
  };

  return (
    <Box sx={slider.wrapper}>
      <Container sx={slider.container} maxWidth={false}>
        <Box sx={slider.info}>
          <Typography sx={slider.title} component="h3">
            <Typography sx={slider.title.span} component="span">
              {content.title.top}
            </Typography>
            {content.title.bottom}
          </Typography>
          <Box sx={slider.navigation}>
            <IconButton onClick={handleClick} name="back" sx={slider.button} aria-label="previous-products">
              <Arrow color={'white'} direction={'left'} size={'l'} />
            </IconButton>
            <Typography sx={slider.count} component="span">
              {count}/{amountItems}
            </Typography>
            <IconButton onClick={handleClick} name="next" sx={slider.button} aria-label="next-products">
              <Arrow color={'white'} direction={'right'} size={'l'} />
            </IconButton>
          </Box>
        </Box>
        <Box sx={slider.box}>
          <List sx={[slider.list, {transform: `translate3d(-${(count - 1) * translateTo}px, 0px, 0px)`}]}>
            {content.list.map((item, i) => (
              <ListItem
                sx={[
                  slider.item,
                  i + 1 > count * 2 ? {opacity: 0.25} : {},
                  i + 2 < count * 2 ? {opacity: 0} : {}]}
                key={i}
                ref={refComponent}
              >
                {item}
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
};

export default Slider;
