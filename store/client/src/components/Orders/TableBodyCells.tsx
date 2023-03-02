import React from 'react';
import {
  TableRow,
  TableCell,
  Button,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import {Link} from 'react-router-dom';
import {handleInputChange} from './handleInputChange';
import {handleDeleteClick} from './handleDeleteClick';
import {getStatusText, statusList} from './statusList';
import {IProps} from './types';

export const TableBodyCells = (props: IProps): JSX.Element => (
  <>
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
                  <MenuItem value={item.value} key={item.value}>
                    {item.status}
                  </MenuItem>
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
            <Button component={Link} to={`/admin/order/${item.id}`} variant="outlined">
              Подробнее
            </Button>
          ) : (
            <Button component={Link} to={`/user/order/${item.id}`} variant="outlined">
              Подробнее
            </Button>
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
  </>
);
