import {useContext, useEffect, useState} from 'react';
import {Spinner} from 'react-bootstrap';
import {AppContext} from './AppContext.js';
import {fetchBasket} from '../http/basketAPI.js';

const FetchBasket = (props) => {
  const {basket} = useContext(AppContext);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchBasket() // eslint-disable-next-line
      .then((data) => (basket.products = data.products))
      .finally(() => setFetching(false));
  }, []);

  if (fetching) {
    return <Spinner animation="border" varian="light" />;
  }

  return props.children;
};

export default FetchBasket;
