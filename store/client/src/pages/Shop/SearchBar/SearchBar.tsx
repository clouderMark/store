import {Box, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {IconTextField} from '../../../components/IconTextField';
import {SelectSort} from './SelectSort';
import {bar} from './styles/bar';

interface IProps {
  matches: boolean;
}

export const SearchBar = (props: IProps) => (
  <Box sx={bar.box}>
    {props.matches ? (
      <IconTextField label="Поиск продукта" variant="filled" sx={bar.textFiled} icon={<SearchIcon />} />
    ) : null}
    <Box sx={bar.boxInBox}>
      <Typography component='span' sx={bar.label}>Сортировать по:</Typography>
      <SelectSort />
    </Box>
  </Box>
);
