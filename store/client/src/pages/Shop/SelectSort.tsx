import {useState} from 'react';
import {FormControl, Select, MenuItem, SelectChangeEvent} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {selectItems} from './selectItems';

export const SelectSort = () => {
  const [age, setAge] = useState('0');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <FormControl sx={{marginLeft: 2}}>
      <Select
        onChange={handleChange}
        sx={{width: '189px'}}
        value={age}
        IconComponent = {KeyboardArrowDownIcon}
      >
        {selectItems.map((item) => (
          <MenuItem value={item.value} key={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
