import {IOrderWithItems} from '../../types/types';
import {Board} from '../Board';
import {ListInfo} from './ListInfo';
import {StatusList} from '../Order/StatusList';
import {TableHeadCells} from './TableHeadCells';
import {TableBodyCells} from './TableBodyCells';

interface IProps {
  data: IOrderWithItems;
  admin: boolean;
}

const Order = (props: IProps) => {
  const BodyCells = () => TableBodyCells(props.data);

  return (
    <>
      <StatusList
        data={props.data}
      />
      <ListInfo
        data={props.data}
      />
      <Board
        tableHeadCells={TableHeadCells}
        tableBodyCells={BodyCells}
      />
    </>
  );
};

export default Order;
