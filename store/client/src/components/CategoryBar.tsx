import {createSearchParams, useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox} from '@mui/material';
import {useAppContext} from './AppContext';
import {IObject} from '../types/types';

const CategoryBar = observer(() => {
  const {catalog} = useAppContext();
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    const index = catalog.category.indexOf(id);

    if (index >= 0) {
      catalog.category = catalog.category.filter((_, i) => i !== index);
    } else {
      catalog.category = [...catalog.category, id];
    }

    // при каждом клике добавляем в браузер новый элемент
    const params: IObject = {};

    if (catalog.category.length > 0) params.category = catalog.category.join(',');
    if (catalog.brand.length > 0) params.brand = catalog.brand.join(',');
    if (catalog.area.length) params.area = catalog.area.join(',');
    if (catalog.page > 1) params.page = `${catalog.page}`;
    navigate({
      pathname: '/shop',
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    <FormControl sx={{m: 3}} component="fieldset" variant="standard">
      <FormLabel component="legend">Категории</FormLabel>
      <FormGroup>
        {catalog.categories.map((item) => (
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => handleClick(item.id)}
                color="success"
                checked={catalog.category.includes(item.id)}
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
