import {adminDelete} from '../../http/orderAPI';
import {IProps} from './types';

export const handleDeleteClick = (id: number, props: IProps): void => {
  adminDelete(id)
    .then((data) => {
      alert(`Заказ №${id} удален`);
      if (props.setItems) {
        props.setItems(props.items.filter((el) => el.id !== data.id));
      }
    })
    .catch((error) => console.error(error));
};
