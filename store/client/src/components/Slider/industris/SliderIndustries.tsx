import {useState, createRef, useEffect} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Box, Container, IconButton, Typography, List, ListItem, Button} from '@mui/material';
import {sliderIndustries as styles} from './styles/sliderIndustries';
import {useAppContext} from '../../AppContext';
import {queryMobile, querySmallTablet} from '../query';
import Arrow from '../../Arrow/Arrow';
import FotoCard from './FotoCard';
import {onTouchStart, onTouchMove, onTouchEnd, handleClick} from '../onTouch';

const SliderIndustries = () => {
  const {catalog} = useAppContext();
  const matchesSmallTablet = useMediaQuery(`(max-width: ${querySmallTablet}px)`, {noSsr: true});
  const matchesMobile = useMediaQuery(`(min-width: ${queryMobile}px)`, {noSsr: true});
  const [quantitySteps] = useState(catalog.industries.length);
  const [count, setCount] = useState(1);
  const [translateTo, setTranslateTo] = useState(0);
  const refComponent = createRef<HTMLLIElement>();

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    if (refComponent.current) {
      const {width} = refComponent.current.getBoundingClientRect();
      const margin = parseInt(getComputedStyle(refComponent.current).marginLeft);
      const translate = width + margin;

      setTranslateTo(translate);
    }
  }, [refComponent]);

  const getActive = (position: number) => {
    const key = `li:nth-of-type(${position})`;
    const result: {[key: string]: any} = {}; // eslint-disable-line

    result[key] = {
      borderLeft: '3px solid white',
    };

    return result;
  };

  let listWidth = `${65 * quantitySteps}vw`;

  if (matchesSmallTablet) {
    listWidth = `${48.8 * quantitySteps}vw`;
  }

  if (!matchesMobile) {
    listWidth = `${98 * quantitySteps}vw`;
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
                  <Button
                    name={`${i}`}
                    onClick={(e) => handleClick(e, setCount, count, quantitySteps)}
                    sx={styles.info.list.button}
                  >
                    {el.name}
                  </Button>
                </ListItem>
              ))}
            </List>
            <Box sx={styles.info.navigation}>
              <IconButton
                onClick={(e) => handleClick(e, setCount, count, quantitySteps)}
                name="back"
                sx={styles.info.button}
                aria-label="previous-industry"
              >
                <Arrow color={'white'} direction={'left'} size={31} />
              </IconButton>
              <IconButton
                onClick={(e) => handleClick(e, setCount, count, quantitySteps)}
                name="next"
                sx={styles.info.button}
                aria-label="next-industry"
              >
                <Arrow color={'white'} direction={'right'} size={31} />
              </IconButton>
            </Box>
          </Box>
        ) : null}
        <Box sx={styles.box}>
          <List
            onTouchStart={(e) => onTouchStart(e, setTouchStart, setTouchEnd)}
            onTouchMove={(e) => onTouchMove(e, setTouchEnd)}
            onTouchEnd={() => onTouchEnd(touchStart, touchEnd, setCount, count, quantitySteps)}
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
