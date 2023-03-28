import {MouseEvent, useState, createRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Container, Box, Typography, IconButton, List, ListItem, Card, CardMedia, CardContent} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {fetchProductsForSlider} from '../../http/catalogAPI';
import {slider} from './styles/slider';
import Arrow from '../Arrow/Arrow';
import {ISlider} from '../../types/types';
import {queryTablet, queryMobile} from './query';

const content = {
  title: {
    top: 'Products',
    bottom: 'Here you can find our latest products.',
  },
};

const Slider = () => {
  const navigate = useNavigate();
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
      const translate = matchesMobile ? (width + margin) * 2 : (width + margin);

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
    <Box sx={slider.wrapper}>
      <Container sx={slider.container} maxWidth={false}>
        {matchesMobile ? (
          <Box sx={slider.info}>
            <Typography sx={slider.info.title} component="h3">
              <Typography sx={slider.info.title.span} component="span">
                {content.title.top}
              </Typography>
              {content.title.bottom}
            </Typography>
            <Box sx={slider.info.navigation}>
              <IconButton onClick={handleClick} name="back" sx={slider.info.button} aria-label="previous-products">
                <Arrow color={'white'} direction={'left'} size={48} />
              </IconButton>
              <Typography sx={slider.info.count} component="span">
                {count}/{quantitySteps}
              </Typography>
              <IconButton onClick={handleClick} name="next" sx={slider.info.button} aria-label="next-products">
                <Arrow color={'white'} direction={'right'} size={48} />
              </IconButton>
            </Box>
          </Box>
        ) : null}
        <Box sx={slider.box}>
          <List
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            sx={[slider.list, {transform: `translate3d(-${(count - 1) * translateTo}px, 0px, 0px)`}]}
          >
            {products?.map((item, i) => (
              <ListItem
                sx={[
                  slider.list.item,
                  getOpacity(i, count, matchesTablet, matchesMobile),
                ]}
                key={i}
                ref={refComponent}
              >
                <Card sx={slider.list.card} onClick={() => navigate(`/shop/${item.id}`)}>
                  {item.image ? (
                    <CardMedia
                      sx={slider.list.image}
                      component="img"
                      image={process.env.REACT_APP_IMG_URL + item.image}
                    />
                  ) : (
                    <CardMedia sx={slider.list.image} component="img" image="http://via.placeholder.com/335" />
                  )}
                  <CardContent sx={slider.list.content}>
                    <Typography sx={slider.list.title} component="p">
                      {item.name}
                    </Typography>
                    <Arrow color={'#008f38'} direction={'right'} size={31} />
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
};

export default Slider;
