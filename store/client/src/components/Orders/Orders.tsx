import React from 'react';
import {
  Typography,
} from '@mui/material';
import {IProps} from './types';
import {Board} from '../Board';
import {TableHeadCells} from './TableHeadCells';
import {TableBodyCells} from './TableBodyCells';

const Orders = (props: IProps) => {
  if (props.items.length === 0) {
    return <Typography variant="body1" sx={{mt: 4, mb: 10}}>Список заказов пустой</Typography>;
  }

  return (
    <Board
      tableHeadCells={TableHeadCells(props.admin)}
      tableBodyCells={TableBodyCells(props)}
    />
  );
};

export default Orders;
