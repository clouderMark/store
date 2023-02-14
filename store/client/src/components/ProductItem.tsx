import {useNavigate} from 'react-router-dom';
import {Card, Col} from 'react-bootstrap';
import {IProductWithProps, IData} from '../types/types';

const ProductItem = ({data}: IData<IProductWithProps>) => {
  const navigate = useNavigate();

  return (
    <Col className="mt-3" onClick={() => navigate(`/product/${data.id}`)}>
      <Card style={{width: 200, cursor: 'pointer'}}>
        {data.image ? (
          <Card.Img variant="top" src={process.env.REACT_APP_IMG_URL + data.image} />
        ) : (
          <Card.Img variant="top" src="http://via.placeholder.com/200" />
        )}
        <Card.Body style={{height: 100, overflow: 'hidden'}}>
          <p>Бренд: {data.brand.name}</p>
          <strong>{data.name}</strong>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductItem;
