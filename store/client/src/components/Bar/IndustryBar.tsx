import {createSearchParams, useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Divider} from '@mui/material';
import {useAppContext} from '../AppContext';
import {IObject} from '../../types/types';
import {bar} from './styles/bar';

const IndustryBar = observer(() => {
  const {catalog} = useAppContext();
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    const index = catalog.industry.indexOf(id);

    if (index >= 0) {
      catalog.industry = catalog.industry.filter((_, i) => i !== index);
    } else {
      catalog.industry = [...catalog.industry, id];
    }

    // при каждом клике добавляем в браузер новый элемент
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
    <>
      <FormControl component="fieldset" variant="standard" sx={bar.control}>
        <FormLabel component="legend" sx={bar.title}>
          Индустрии
        </FormLabel>
        <FormGroup>
          {catalog.industries.map((item) => (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => handleClick(item.id)}
                  color="success"
                  checked={catalog.industry.includes(item.id)}
                />
              }
              sx={bar.text}
              label={item.name}
              key={item.id}
            />
          ))}
        </FormGroup>
      </FormControl>
      <Divider sx={bar.divider} />
    </>
  );
});

export default IndustryBar;
