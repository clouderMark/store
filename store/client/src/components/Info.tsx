import {Box, Typography} from '@mui/material';
import ContainerWithTwoColumns from './ContainerWithTwoColumns/ContainerWithTwoColumns';
import StrongWithTitle from './StrongWithTitle/StrongWithTitle';
import ListWithSubheader from './ListWithSubheader/ListWithSubheader';
import {IInfo} from '../types/types';

interface IProps {
  item: IInfo;
  buttons: JSX.Element;
}

const Info = (props: IProps) => {
  const {image, header, title, listTitle, listItems, paragraphs} = props.item;

  return (
    <ContainerWithTwoColumns
      firstColumn={
        <>{image ? <Box component="img" src={image} sx={{width: '100%', mt: '30px', mb: '30px'}} /> : null}</>
      }
      secondColumn={
        <>
          {title || header ? (
            <Box sx={{'& div': {pt: 0, pb: '10px'}}}>
              <StrongWithTitle content={{p: title, title: header}} titleComponent={'h2'} />
            </Box>
          ) : null}
          {listTitle || listItems.length ? (
            <ListWithSubheader subheader={listTitle} items={listItems.map((el) => el.value)} />
          ) : null}
          {paragraphs.map((el) => (
            <Typography component="p" key={el.id} sx={{mb: '20px'}}>
              {el.value}
            </Typography>
          ))}
        </>
      }
      buttons={props.buttons}
    />
  );
};

export default Info;
