import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Button,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import {Link} from 'react-router-dom';
import {headCells} from './headCells';
import {handleInputChange} from './handleInputChange';
import {handleDeleteClick} from './handleDeleteClick';
import {IProps} from './types';
import {getStatusText, statusList} from './statusList';

const Orders = (props: IProps) => {
  if (props.items.length === 0) {
    return <p>Список заказов пустой</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell key={headCell.id}>{headCell.label}</TableCell>
            ))}
            {props.admin ? <TableCell>Удалить</TableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map((item) => (
            <TableRow key={item.id} hover>
              <TableCell scope="row">{item.id}</TableCell>
              <TableCell>{item.prettyCreatedAt}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>
                {props.admin ? (
                  <FormControl size="small">
                    <Select
                      name="status"
                      value={item.status}
                      onChange={(e) => handleInputChange(`${e.target.value}`, item.id, props)}
                    >
                      {statusList.map((item) => (
                        <MenuItem value={item.value} key={item.value}>{item.status}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  getStatusText(item.status)
                )}
              </TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>
                {props.admin ? (
                  <Button component={Link} to={`/admin/order/${item.id}`} variant="outlined">Подробнее</Button>
                ) : (
                  <Button component={Link} to={`/user/order/${item.id}`} variant="outlined">Подробнее</Button>
                )}
              </TableCell>
              {props.admin ? (
                <TableCell>
                  <Button variant="outlined" onClick={() => handleDeleteClick(item.id, props)} color="warning">
                    Удалить
                  </Button>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Orders;
