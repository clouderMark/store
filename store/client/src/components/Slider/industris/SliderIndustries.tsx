import {MouseEvent, useState, createRef, useEffect} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Box, Container, IconButton, Typography, List, ListItem, Button} from '@mui/material';
import {sliderProducts as styles} from '../styles/sliderProducts';
import {useAppContext} from '../../AppContext';
import {queryMobile, querySmallTablet} from '../query';
import Arrow from '../../Arrow/Arrow';
import FotoCard from './FotoCard';

const SliderIndustries = () => {
  const {catalog} = useAppContext();
  const matchesSmallTablet = useMediaQuery(`(max-width: ${querySmallTablet}px)`, {noSsr: true});
  const matchesMobile = useMediaQuery(`(min-width: ${queryMobile}px)`, {noSsr: true});
  const [count, setCount] = useState(1);
  const [translateTo, setTranslateTo] = useState(0);
  const refComponent = createRef<HTMLLIElement>();

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    if (refComponent.current) {
      const {width} = refComponent.current.getBoundingClientRect();
      const margin = parseInt(getComputedStyle(refComponent.current).marginLeft);
      const translate = width + margin;

      setTranslateTo(translate);
    }
  }, [refComponent]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const {name} = event.currentTarget;

    if (name === 'next') {
      setCount(count <= catalog.industries.length - 1 ? count + 1 : 1);
    } else if (name === 'back') {
      setCount(count >= 2 ? count - 1 : catalog.industries.length);
    } else {
      setCount(+name + 1);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCount(count <= catalog.industries.length - 1 ? count + 1 : 1);
    }

    if (isRightSwipe) {
      setCount(count >= 2 ? count - 1 : catalog.industries.length);
    }
  };

  const getActive = (position: number) => {
    const key = `li:nth-of-type(${position})`;
    const result: {[key: string]: any} = {}; // eslint-disable-line

    result[key] = {
      borderLeft: '3px solid white',
    };

    return result;
  };

  let listWidth = `${65 * catalog.industries.length}vw`;

  if (matchesSmallTablet) {
    listWidth = `${48.8 * catalog.industries.length}vw`;
  }

  if (!matchesMobile) {
    listWidth = `${98 * catalog.industries.length}vw`;
  }

  return (
    <Box sx={styles.wrapper}>
      <Container sx={styles.container} maxWidth={false}>
        {matchesMobile ? (
          <Box sx={styles.info}>
            <Box sx={styles.square} />
            <Typography sx={styles.info.title} component="h3">
              Области применения
            </Typography>
            <List sx={[styles.info.list, getActive(count)]}>
              {catalog.industries.map((el, i) => (
                <ListItem disablePadding key={el.id}>
                  <Button name={`${i}`} onClick={handleClick} sx={styles.info.list.button}>
                    {el.name}
                  </Button>
                </ListItem>
              ))}
            </List>
            <Box sx={styles.info.navigation}>
              <IconButton onClick={handleClick} name="back" sx={styles.info.button} aria-label="previous-industry">
                <Arrow color={'white'} direction={'left'} size={31} />
              </IconButton>
              <IconButton onClick={handleClick} name="next" sx={styles.info.button} aria-label="next-industry">
                <Arrow color={'white'} direction={'right'} size={31} />
              </IconButton>
            </Box>
          </Box>
        ) : null}
        <Box sx={styles.box}>
          <List
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            sx={[
              styles.list,
              {
                transform: `translate3d(-${(count - 1) * translateTo}px, 0px, 0px)`,
                width: listWidth,
              },
            ]}
          >
            {catalog.industries.map((el, i) => (
              <ListItem sx={styles.list.item} key={i} ref={refComponent}>
                <FotoCard id={el.id} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
};

export default SliderIndustries;
