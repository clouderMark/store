import {Box, Button, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {IParagraphs, IParagraphsRelatedTo, IImageRelatedTo} from '../types/types';
import ContainerWithTwoColumns from './ContainerWithTwoColumns/ContainerWithTwoColumns';
import {EPath} from '../enums/EPath';

interface IProps {
  item: {
    infoParagraphs: IParagraphsRelatedTo[];
    infoTitle: IParagraphs[];
    infoImages: IImageRelatedTo[];
  };
}

const styles = {
  img: {width: '100%', mt: '30px', mb: '30px'},
  title: {mb: '20px', fontSize: '35px', fontWeight: 300, lineHeight: 1.2},
  text: {mb: '20px', fontSize: '18px', fontWeight: 300},
};

const InfoChangingColumnSide = (props: IProps) => {
  const {item} = props;

  const ButtonToProduct = () => (
    <Button component={NavLink} to={EPath.Shop} color="first" variant="contained" sx={{mt: '20px'}}>
      К продуктам
    </Button>
  );

  return (
    <>
      {item.infoTitle.map((el, i) => (
        <ContainerWithTwoColumns
          key={el.unique}
          firstColumn={
            <>
              {!(i % 2) ? (
                <Box component="img" src={process.env.REACT_APP_IMG_URL! + item.infoImages[i].image} sx={styles.img} />
              ) : (
                <>
                  <Typography component="h2" sx={styles.title}>
                    {el.value}
                  </Typography>
                  {item.infoParagraphs
                    .filter((elem) => elem.relatedTo === el.unique)
                    .map((elem, i) => (
                      <Typography key={i} sx={styles.text}>
                        {elem.value}
                      </Typography>
                    ))}
                  <ButtonToProduct />
                </>
              )}
            </>
          }
          secondColumn={
            <>
              {i % 2 ? (
                <Box component="img" src={process.env.REACT_APP_IMG_URL! + item.infoImages[i].image} sx={styles.img} />
              ) : (
                <>
                  <Typography component="h2" sx={styles.title}>
                    {el.value}
                  </Typography>
                  {item.infoParagraphs
                    .filter((elem) => elem.relatedTo === el.unique)
                    .map((elem, i) => (
                      <Typography key={i} sx={styles.text}>
                        {elem.value}
                      </Typography>
                    ))}
                  <ButtonToProduct />
                </>
              )}
            </>
          }
          firstColumnWidth={45}
        />
      ))}
    </>
  );
};

export default InfoChangingColumnSide;
