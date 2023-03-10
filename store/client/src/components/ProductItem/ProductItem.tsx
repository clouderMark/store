import {useNavigate} from 'react-router-dom';
import {Card, CardMedia, CardContent, Typography} from '@mui/material';
import {IProductWithProps, IData} from '../../types/types';
import {card} from './styles';
import {getPricePerKg} from './getPricePerKg';

const ProductItem = ({data}: IData<IProductWithProps>) => {
  const navigate = useNavigate();

  return (
    <Card sx={card.card} onClick={() => navigate(`/shop/${data.id}`)}>
      {data.image ? (
        <CardMedia sx={card.img} component="img" image={process.env.REACT_APP_IMG_URL + data.image} />
      ) : (
        <CardMedia sx={card.img} component="img" image="http://via.placeholder.com/335" />
      )}
      <CardContent sx={card.content}>
        <Typography sx={card.article} component="p">
          Артикул #{data.article}
        </Typography>
        <Typography sx={card.title} component="strong">
          {data.name}
        </Typography>
        <Typography sx={card.solution} component="p">
          Решение: {data.solution.name}
        </Typography>
        <Typography sx={card.price} component="strong">
          {data.price} BYN
        </Typography>
        <Typography sx={card.weight} component="strong">
          {data.weight} kg ({getPricePerKg(data.weight, data.price)} BYN/kg)
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
