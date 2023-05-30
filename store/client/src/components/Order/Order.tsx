import {IOrderWithItems} from '../../types/types';
import {Board} from '../Board';
import {ListInfo} from './ListInfo';
import {StatusList} from '../Order/StatusList';
import {TableBodyCells} from './TableBodyCells';
import TableCells from '../TableCells/TableCells';
import {orderCells} from '../TableCells/cells';

interface IProps {
  data: IOrderWithItems;
  admin: boolean;
}

const Order = (props: IProps) => (
  <>
    <StatusList data={props.data} />
    <ListInfo data={props.data} />
    <Board tableHeadCells={<TableCells cells={orderCells} />} tableBodyCells={TableBodyCells(props.data)} />
  </>
);

export default Order;
