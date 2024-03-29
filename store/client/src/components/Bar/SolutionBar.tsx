import {observer} from 'mobx-react-lite';
import {createSearchParams, useNavigate} from 'react-router-dom';
import {FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Divider} from '@mui/material';
import {useAppContext} from '../AppContext';
import {IObject} from '../../types/types';
import {bar} from './styles/bar';
import {EPath} from '../../enums/EPath';
import {EName} from '../../enums/EName';
import {EQuery} from '../../enums/EQuery';

const SolutionBar = observer(() => {
  const {catalog} = useAppContext();
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    const index = catalog.solution.indexOf(id);

    if (index >= 0) {
      catalog.solution = catalog.solution.filter((_, i) => i !== index);
    } else {
      catalog.solution = [...catalog.solution, id];
    }

    // при каждом клике добавляем в историю браузера новый элемент
    const params: IObject = {};

    if (catalog.industry.length) params[EQuery.industry] = catalog.industry.join(',');
    if (catalog.solution.length) params[EQuery.solution] = catalog.solution.join(',');
    if (catalog.area.length) params[EQuery.area] = catalog.area.join(',');
    if (catalog.page > 1) params[EQuery.page] = `${catalog.page}`;
    navigate({
      pathname: EPath.Shop,
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    <>
      <FormControl component="fieldset" variant="standard" sx={bar.control}>
        <FormLabel component="legend" sx={bar.title}>
          {EName.Solutions}
        </FormLabel>
        <FormGroup>
          {catalog.solutions.map((item) => (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => handleClick(item.id)}
                  color="success"
                  checked={catalog.solution.includes(item.id)}
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

export default SolutionBar;
