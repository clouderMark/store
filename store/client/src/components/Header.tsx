import {Box, Typography} from '@mui/material';
import ContainerWithTwoColumns from './ContainerWithTwoColumns/ContainerWithTwoColumns';
import StrongWithTitle from './StrongWithTitle/StrongWithTitle';
import {IListItem} from '../types/types';

interface IProps {
  item: {
    name: string;
    title: string;
    paragraphs: IListItem[];
  };
}

const Header = (props: IProps) => {
  const {item} = props;

  return (
    <ContainerWithTwoColumns
      firstColumn={
        <Box sx={{'& div': {pt: 0}}}>
          <StrongWithTitle content={{p: item.name ?? '', title: item.title ?? ''}} />
        </Box>
      }
      secondColumn={
        <>
          {item.paragraphs.map((el) => (
            <Typography key={el.id} sx={{mb: '10px'}}>
              {el.value}
            </Typography>
          ))}
        </>
      }
    />
  );
};

export default Header;
