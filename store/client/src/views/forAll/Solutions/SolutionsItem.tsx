import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchSolution} from '../../../http/catalogAPI';
import {IFetchSolution} from '../../../types/types';
import Progress from '../../../components/LinearDeterminate';
import CentererImage from '../../../components/CentererImage/CentererImage';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import Opinion from '../../../components/Opinion/Opinion';
import InfoChangingColumnSide from '../../../components/InfoChangingColumnSide';
import Header from '../../../components/Header';

const SolutionsItem = () => {
  const id: number = Number(useParams().id);
  const [item, setItem] = useState<IFetchSolution>();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchSolution(id)
      .then((data) => setItem(data))
      .finally(() => setFetching(false));
  }, [id]);

  if (fetching) {
    return <Progress />;
  }

  return (
    <>
      {item ? (
        <>
          <CentererImage img={process.env.REACT_APP_IMG_URL + item.headerImage} />
          <Breadcrumbs />
          <Header item={item}/>
          <Opinion item={item.opinion} />
          <InfoChangingColumnSide item={item}/>
        </>
      ) : null}
    </>
  );
};

export default SolutionsItem;
