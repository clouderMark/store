import {createSearchParams, useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {useContext} from 'react';
import {ListGroup} from 'react-bootstrap';
import {AppContext} from './AppContext';

const CategoryBar = observer(() => {
  const {catalog} = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = (id) => {
    if (id === catalog.category) {
      catalog.category = null;
    } else {
      catalog.category = id;
    }

    // при каждом клике добавляем в браузер новый элемент
    const params = {};

    if (catalog.category) params.category = catalog.category;
    if (catalog.brand) params.brand = catalog.brand;
    if (catalog.page > 1) params.page = catalog.page;
    navigate({
      pathname: '/',
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
