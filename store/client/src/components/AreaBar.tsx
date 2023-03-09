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
    const index = catalog.area.indexOf(id);

    if (index >= 0) {
      catalog.area = catalog.area.filter((_, i) => i !== index);
    } else {
      catalog.area = [...catalog.area, id];
    }

    // при каждом клике добавляем в историю браузера новый элемент
    const params: IObject = {};

    if (catalog.industry.length) params.industry = catalog.industry.join(',');
    if (catalog.solution.length) params.solution = catalog.solution.join(',');
    if (catalog.area.length) params.area = catalog.area.join(',');
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
                checked={catalog.area.includes(item.id)}
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
