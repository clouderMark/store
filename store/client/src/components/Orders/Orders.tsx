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
    return <Typography variant="body1">Список заказов пустой</Typography>;
  }

  const BodyCells = () => TableBodyCells(props);

  return (
    <Board
      tableHeadCells={TableHeadCells(props.admin)}
      tableBodyCells={BodyCells}
    />
  );
};

export default Orders;
