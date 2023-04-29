import {MouseEvent, useState, createRef, useEffect} from 'react';
import {Container, Box, Typography, IconButton, List, ListItem} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {fetchProductsForSlider} from '../../../http/catalogAPI';
import {slider as styles} from '../styles/slider';
import Arrow from '../../Arrow/Arrow';
import {ISlider} from '../../../types/types';
import {queryTablet, queryMobile} from '../query';
import CardItem from '../../CardItem/CardItem';
import {EPath} from '../../../enums/EPath';

const content = {
  title: {
    top: 'Products',
    bottom: 'Here you can find our latest products.',
  },
};

const SliderProducts = () => {
  const matchesTablet = useMediaQuery(`(min-width: ${queryTablet}px)`, {noSsr: true});
  const matchesMobile = useMediaQuery(`(min-width: ${queryMobile}px)`, {noSsr: true});
  const amountOfProducts = 9;
  const quantitySteps = Math.ceil(amountOfProducts / 2);
  const [count, setCount] = useState(1);
  const [translateTo, setTranslateTo] = useState(0);
  const refComponent = createRef<HTMLLIElement>();
  const [products, setProducts] = useState<ISlider[] | null>(null);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    fetchProductsForSlider(amountOfProducts)
      .then((data) => {
        setProducts(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (refComponent.current) {
      const {width} = refComponent.current.getBoundingClientRect();
      const margin = parseInt(getComputedStyle(refComponent.current).marginLeft);
      const translate = matchesMobile ? (width + margin) * 2 : width + margin;

      setTranslateTo(translate);
    }
  }, [refComponent]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const {name} = event.currentTarget;

    if (name === 'next') {
      setCount(count <= quantitySteps - 1 ? count + 1 : 1);
    } else {
      setCount(count >= 2 ? count - 1 : quantitySteps);
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
      setCount(count <= quantitySteps - 1 ? count + 1 : 1);
    }

    if (isRightSwipe) {
      setCount(count >= 2 ? count - 1 : quantitySteps);
    }
  };

  const getOpacity = (item: number, counter: number, queryTablet: boolean, queryMobile: boolean) => {
    interface IResult {
      opacity?: number;
    }
    const result: IResult = {};

    if (item + 1 > counter * 2 && queryTablet) {
      result.opacity = 0.25;
    }

    if (item + 2 < counter * 2 && queryMobile) {
      result.opacity = 0;
    }

    return result;
  };

  return (
    <Box sx={styles.wrapper}>
      <Container sx={styles.container} maxWidth={false}>
        {matchesMobile ? (
          <Box sx={styles.info}>
            <Typography sx={styles.info.title} component="h3">
              <Typography sx={styles.info.title.span} component="span">
                {content.title.top}
              </Typography>
              {content.title.bottom}
            </Typography>
            <Box sx={styles.info.navigation}>
              <IconButton onClick={handleClick} name="back" sx={styles.info.button} aria-label="previous-products">
                <Arrow color={'white'} direction={'left'} size={48} />
              </IconButton>
              <Typography sx={styles.info.count} component="span">
                {count}/{quantitySteps}
              </Typography>
              <IconButton onClick={handleClick} name="next" sx={styles.info.button} aria-label="next-products">
                <Arrow color={'white'} direction={'right'} size={48} />
              </IconButton>
            </Box>
          </Box>
        ) : null}
        <Box sx={styles.box}>
          <List
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            sx={[styles.list, {transform: `translate3d(-${(count - 1) * translateTo}px, 0px, 0px)`}]}
          >
            {products?.map((item, i) => (
              <ListItem
                sx={[styles.list.item, getOpacity(i, count, matchesTablet, matchesMobile)]}
                key={i}
                ref={refComponent}
              >
                <CardItem image={item.image} to={`${EPath.Shop}/${item.id}`} name={item.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
};

export default SliderProducts;
