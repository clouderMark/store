import {Box, Button} from '@mui/material';
import {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useAppContext} from '../../AppContext';
import {IAreaResponse} from '../../../types/types';
import {EPath} from '../../../enums/EPath';
import Arrow from '../../Arrow/Arrow';
import {fotoCard as styles} from './styles/fotoCard';

interface IProps {
  id: number;
}

const FotoCard = (props: IProps) => {
  const {catalog} = useAppContext();
  const {id} = props;
  const [item, setItem] = useState<IAreaResponse>();
  const [subItems, setSubItems] = useState<IAreaResponse[]>();

  useEffect(() => {
    setItem(catalog.industries.find((el) => el.id === id));
    setSubItems(catalog.subIndustries.filter((el) => el.industryId === id));
  }, [id]);

  return (
    <>
      {item ? (
        <Box
          sx={[
            styles.card,
            {
              backgroundImage: `linear-gradient(to bottom,rgba(0,0,0,0) 0%,#333 100%),
             url(${process.env.REACT_APP_IMG_URL! + item.sliderImage})`,
            },
          ]}
        >
          <Box sx={styles.box}>
            <Button
              component={NavLink}
              to={`${EPath.Industries}/${item.id}`}
              sx={styles.toParrentButton}
            >
              {item.name}
            </Button>
            <Box
              sx={styles.buttonsBox}
            >
              {subItems?.map((el, i) => (
                <Button
                  component={NavLink}
                  to={`${EPath.Industries}/${item.id}/${el.id}`}
                  sx={styles.button}
                  endIcon={<Arrow color={'white'} direction="right" size={22} />}
                  key={i}
                >
                  {el.name}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default FotoCard;
