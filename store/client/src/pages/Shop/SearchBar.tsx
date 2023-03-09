import {Box, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {IconTextField} from '../../components/IconTextField';
import {SelectSort} from './SelectSort';
import {bar} from './styles';

export const SearchBar = () => (
  <Box sx={bar.box}>
    <IconTextField label="Поиск продукта" variant="filled" sx={bar.textFiled} icon={<SearchIcon />} />
    <Box sx={bar.boxInBox}>
      <Typography component='span' sx={bar.label}>Сортировать по:</Typography>
      <SelectSort />
    </Box>
  </Box>
);
