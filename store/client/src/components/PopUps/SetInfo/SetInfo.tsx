import React, {ChangeEvent, Dispatch, SetStateAction} from 'react';
import uuid from 'react-uuid';
import {Button} from '@mui/material';
import ContainerWithTwoColumns from '../../ContainerWithTwoColumns/ContainerWithTwoColumns';
import CardInputImage from '../CardInputImage';

interface IImage {
  image: File | null;
  imageUrl: string;
  unique: string;
}

interface IProps {
  rows: IImage[];
  setRows: Dispatch<SetStateAction<IImage[]>>;
}

const SetInfo = (props: IProps) => {
  const {rows, setRows} = props;

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      const file = event.target.files[0];
      const {name} = event.target;
      const newImageUrl = URL.createObjectURL(file);

      setRows(rows.map((el) => (name === el.unique ? {...el, image: file, imageUrl: newImageUrl} : el)));
    }
  };

  const append = () => {
    setRows([...rows, {image: null, imageUrl: '', unique: uuid()}]);
  };

  const remove = (unique: string) => {
    setRows(rows.filter((el) => el.unique !== unique));
  };

  return (
    <>
      <Button onClick={append} color="first" variant="contained">
        Добавить блок с информацией
      </Button>
      {rows.map((el) => (
        <React.Fragment key={el.unique}>
          <ContainerWithTwoColumns
            firstColumn={
              <CardInputImage
                id={el.image ? 1 : null}
                value={el.imageUrl}
                name={el.unique}
                handleImageChange={handleImageChange}
              />
            }
            secondColumn={
              <Button onClick={() => remove(el.unique)} color="first" variant="contained">
                Удалить
              </Button>
            }
          />
        </React.Fragment>
      ))}
    </>
  );
};

export default SetInfo;
