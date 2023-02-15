import {updateProductStatus} from '../../http/orderAPI';
import {IProps} from './types';

export const handleInputChange = (e: string, id: number, props: IProps): void => {
  const data = new FormData();

  data.append('status', e);
  updateProductStatus(id, data)
    .then((data) => {
      if (props.setItems) {
        props.setItems(
          props.items.map((el) => {
            if (el.id === id) el.status = data.status;

            return el;
          }),
        );
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
