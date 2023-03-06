import {observer} from 'mobx-react-lite';
import {createSearchParams, useNavigate} from 'react-router-dom';
import {FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox} from '@mui/material';
// import {ListGroup} from 'react-bootstrap';
import {useAppContext} from './AppContext';
import {IObject} from '../types/types';

const AreaBar = observer(() => {
  const {catalog} = useAppContext();
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    if (id === catalog.area) {
      catalog.area = null;
    } else {
      catalog.area = id;
    }

    // при каждом клике добавляем в историю браузера новый элемент
    const params: IObject = {};

    if (catalog.category.length > 0) params.category = catalog.category.join(',');
    if (catalog.brand.length > 0) params.brand = catalog.brand.join(',');
    if (catalog.area) params.area = `${catalog.area}`;
    if (catalog.page > 1) params.page = `${catalog.page}`;
    navigate({
      pathname: '/shop',
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    <FormControl sx={{m: 3}} component="fieldset" variant="standard">
      <FormLabel component="legend">Области применения</FormLabel>
      <FormGroup>
        {catalog.areas.map((item) => (
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => handleClick(item.id)}
                checked={item.id === catalog.area}
                color="success" />}
            label={item.name}
            key={item.id}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
});

export default AreaBar;
