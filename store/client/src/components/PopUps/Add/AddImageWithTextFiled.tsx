import React, {ChangeEvent, Dispatch, SetStateAction} from 'react';
import uuid from 'react-uuid';
import {Box, Button, IconButton, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ContainerWithTwoColumns from '../../ContainerWithTwoColumns/ContainerWithTwoColumns';
import CardInputImage from '../CardInputImage';
import {IImage, IParagraphsRelatedTo} from '../../../types/types';
import TextFiledWithIcon from './TextFiledWithIcon';

interface IProps {
  images: IImage[];
  setImages: Dispatch<SetStateAction<IImage[]>>;
  paragraphs: IParagraphsRelatedTo[];
  setParagraphs: Dispatch<SetStateAction<IParagraphsRelatedTo[]>>;
}

const AddImageWithTextFiled = (props: IProps) => {
  const {images, setImages, paragraphs, setParagraphs} = props;

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      const file = event.target.files[0];
      const {name} = event.target;
      const newImageUrl = URL.createObjectURL(file);

      setImages(images.map((el) => (name === el.unique ? {...el, image: file, imageUrl: newImageUrl} : el)));
    }
  };

  const append = () => {
    setImages([...images, {image: null, imageUrl: '', unique: uuid()}]);
  };

  const remove = (unique: string) => {
    setImages(images.filter((el) => el.unique !== unique));
    setParagraphs(paragraphs.filter((el) => el.relatedTo !== unique));
  };

  const appendParagraph = (relatedTo: string) => {
    setParagraphs([...paragraphs, {id: null, value: '', unique: uuid(), relatedTo}]);
  };

  const changeParagraph = (value: string, unique: string) => {
    setParagraphs(paragraphs.map((item) => (item.unique === unique ? {...item, value} : item)));
  };

  const removeParagraph = (unique: string) => {
    setParagraphs(paragraphs.filter((elem) => elem.unique !== unique));
  };

  return (
    <>
      <Button onClick={append} color="first" variant="contained">
        Добавить блок с информацией
      </Button>
      {images.map((el) => (
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
              <>
                <Button onClick={() => remove(el.unique)} color="warning" variant="outlined">
                  Удалить
                </Button>
                <>
                  <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '30px'}}>
                    <Typography component="span">Добавить абзац</Typography>
                    <IconButton color="secondary" aria-label="add" onClick={() => appendParagraph(el.unique)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  {paragraphs
                    .filter((elem) => elem.relatedTo === el.unique)
                    .map((item) => (
                      <TextFiledWithIcon
                        item={{...item, placeholder: 'параграф', onChange: changeParagraph, remove: removeParagraph}}
                        key={item.unique}
                      />
                    ))}
                </>
              </>
            }
          />
        </React.Fragment>
      ))}
    </>
  );
};

export default AddImageWithTextFiled;
