import {useState} from 'react';
import {FormControl, Select, MenuItem, SelectChangeEvent} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {selectItems} from './selectItems';
import {select} from './styles/select';

export const SelectSort = () => {
  const [sort, setSort] = useState('0');

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  return (
    <FormControl sx={select.conrol}>
      <Select onChange={handleChange} sx={select.select} value={sort} IconComponent={KeyboardArrowDownIcon}>
        {selectItems.map((item) => (
          <MenuItem value={item.value} key={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
