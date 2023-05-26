import {useNavigate} from 'react-router-dom';
import {Card, CardMedia, CardContent, Typography} from '@mui/material';
import {cardItem as styles} from './styles/cardItem';
import Arrow from '../Arrow/Arrow';
import {theme} from '../../styles/theme';

interface IProps {
  image?: string | null;
  to: string;
  name: string;
}

const CardItem = (props: IProps) => {
  const navigate = useNavigate();

  return (
    <Card sx={styles.card} onClick={() => navigate(props.to)}>
      {props.image ? (
        <CardMedia sx={styles.image} component="img" image={process.env.REACT_APP_IMG_URL + props.image} />
      ) : (
        <CardMedia sx={styles.image} component="img" image="http://via.placeholder.com/335" />
      )}
      <CardContent sx={styles.content}>
        <Typography sx={styles.title} component="p">
          {props.name}
        </Typography>
        <Arrow color={theme.palette.first.main} direction={'right'} size={31} />
      </CardContent>
    </Card>
  );
};

export default CardItem;
