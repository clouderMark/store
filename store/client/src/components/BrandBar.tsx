import {observer} from 'mobx-react-lite';
import {createSearchParams, useNavigate} from 'react-router-dom';
import {FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox} from '@mui/material';
// import {ListGroup} from 'react-bootstrap';
import {useAppContext} from './AppContext';
import {IObject} from '../types/types';

const BrandBar = observer(() => {
  const {catalog} = useAppContext();
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    if (id === catalog.brand) {
      catalog.brand = null;
    } else {
      catalog.brand = id;
    }

    // при каждом клике добавляем в историю браузера новый элемент
    const params: IObject = {};

    if (catalog.category) params.category = `${catalog.category}`;
    if (catalog.brand) params.brand = `${catalog.brand}`;
    if (catalog.page > 1) params.page = `${catalog.page}`;
    navigate({
      pathname: '/shop',
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    // <ListGroup>
    //   {catalog.brands.map((item) => (
    //     <ListGroup.Item
    //       key={item.id}
    //       active={item.id === catalog.brand}
    //       onClick={() => handleClick(item.id)}
    //       style={{cursor: 'pointer'}}
    //     >
    //       {item.name}
    //     </ListGroup.Item>
    //   ))}
    // </ListGroup>
    <FormControl sx={{m: 3}} component="fieldset" variant="standard">
      <FormLabel component="legend">Области применения</FormLabel>
      <FormGroup>
        {catalog.brands.map((item) => (
          <FormControlLabel
            control={<Checkbox onChange={() => handleClick(item.id)} name="gilad" color="success"/>}
            label={item.name}
            key={item.id}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
});

export default BrandBar;
