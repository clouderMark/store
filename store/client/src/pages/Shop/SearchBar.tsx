import {Box} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {IconTextField} from '../../components/IconTextField';
import {SelectSort} from './SelectSort';

export const SearchBar = () => (
  <Box sx={{display: 'flex', justifyContent: 'space-between', mt: '90px'}}>
    <IconTextField
      label="Поиск продукта"
      variant="filled"
      sx={{width: '296px', height: '55px'}}
      icon={<SearchIcon />}
    />
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      Сортировать по:
      <SelectSort />
    </Box>
  </Box>
);
