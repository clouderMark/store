import {createSearchParams, useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {ListGroup} from 'react-bootstrap';
import {useAppContext} from './AppContext';
import {IObject} from '../types/types';

const CategoryBar = observer(() => {
  const {catalog} = useAppContext();
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    if (id === catalog.category) {
      catalog.category = null;
    } else {
      catalog.category = id;
    }

    // при каждом клике добавляем в браузер новый элемент
    const params: IObject = {};

    if (catalog.category) params.category = `${catalog.category}`;
    if (catalog.brand) params.brand = `${catalog.brand}`;
    if (catalog.page > 1) params.page = `${catalog.page}`;
    navigate({
      pathname: '/shop',
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    <ListGroup>
      {catalog.categories.map((item) => (
        <ListGroup.Item
          key={item.id}
          active={item.id === catalog.category}
          onClick={() => handleClick(item.id)}
          style={{cursor: 'pointer'}}
        >
          {item.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default CategoryBar;
