import React, {Dispatch, SetStateAction} from 'react';
import {Box, Button, CircularProgress, Drawer, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IndustryBar from '../IndustryBar';
import AreaBar from '../AreaBar';
import SolutionBar from '../SolutionBar';
import {button, mockHeight} from '../../../views/Shop/styles/button';
import {IconTextField} from '../../IconTextField';

interface IProps {
  industriesFetching: boolean;
  areasFetching: boolean;
  solutionsFetching: boolean;
  resetFilters(): void;
  isResetButton: boolean;
  query: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const FiltersBar = (props: IProps) => {
  const handleClick = () => {
    props.setOpen(false);
  };

  const FilterBlock = () => (
    <>
      {props.industriesFetching ? <CircularProgress color="success" /> : <IndustryBar />}
      {props.areasFetching ? <CircularProgress color="success" /> : <AreaBar />}
      {props.solutionsFetching ? <CircularProgress color="success" /> : <SolutionBar />}
      {props.isResetButton ? (
        <Button variant="outlined" sx={button.reset} onClick={props.resetFilters}>
          Сбросить фильтры
        </Button>
      ) : (
        <Box sx={mockHeight} />
      )}
    </>
  );

  return (
    <>
      {props.query ? (
        <Box sx={{width: '25.57%', marginRight: '100px'}}>
          <Box sx={{display: 'flex', flexDirection: 'column', width: '83%'}}>
            {FilterBlock()}
          </Box>
        </Box>
      ) : (
        <Drawer anchor="left" open={props.open} PaperProps={{sx: {width: '100%', p: '16px'}}} transitionDuration={500}>
          <Box sx={{display: 'flex', justifyContent: 'flex-end', mb: '10px'}}>
            <IconButton onClick={handleClick} size="large" aria-label="close filters">
              <HighlightOffIcon />
            </IconButton>
          </Box>
          <IconTextField label="Поиск продукта" variant="filled" sx={{mb: '30px'}} icon={<SearchIcon />} />
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            {FilterBlock()}
          </Box>
        </Drawer>
      )}
    </>
  );
};
