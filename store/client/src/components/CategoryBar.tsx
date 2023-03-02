import {createSearchParams, useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox} from '@mui/material';
// import {ListGroup, FormLabel} from 'react-bootstrap';
import {useAppContext} from './AppContext';
import {IObject} from '../types/types';

const CategoryBar = observer(() => {
  const {catalog} = useAppContext();
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    if (id === catalog.category) {
      catalog.category = null;
    } else {
      catalog.category = id;
    }

    // при каждом клике добавляем в браузер новый элемент
    const params: IObject = {};

    if (catalog.category) params.category = `${catalog.category}`;
    if (catalog.brand) params.brand = `${catalog.brand}`;
    if (catalog.area) params.area = `${catalog.area}`;
    if (catalog.page > 1) params.page = `${catalog.page}`;
    navigate({
      pathname: '/shop',
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    // <ListGroup>
    //   {catalog.categories.map((item) => (
    //     <ListGroup.Item
    //       key={item.id}
    //       active={item.id === catalog.category}
    //       onClick={() => handleClick(item.id)}
    //       style={{cursor: 'pointer'}}
    //     >
    //       {item.name}
    //     </ListGroup.Item>
    //   ))}
    // </ListGroup>
    <FormControl sx={{m: 3}} component="fieldset" variant="standard">
      <FormLabel component="legend">Категории</FormLabel>
      <FormGroup>
        {catalog.categories.map((item) => (
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => handleClick(item.id)}
                name="gilad"
                color="success"
                sx={{'& .MuiSvgIcon-root': {border: '1px'}}}
              />
            }
            label={item.name}
            key={item.id}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
});

export default CategoryBar;
