import {ChangeEvent, Dispatch, SetStateAction, Fragment} from 'react';
import uuid from 'react-uuid';
import {Box, Button, IconButton, TextField, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ContainerWithTwoColumns from '../../ContainerWithTwoColumns/ContainerWithTwoColumns';
import CardInputImage from '../CardInputImage';
import {IImage, IParagraphsRelatedTo, ITitleRelatedTo} from '../../../types/types';
import TextFiledWithIcon from './TextFiledWithIcon';

interface IProps {
  images: IImage[];
  setImages: Dispatch<SetStateAction<IImage[]>>;
  paragraphs: IParagraphsRelatedTo[];
  setParagraphs: Dispatch<SetStateAction<IParagraphsRelatedTo[]>>;
  title: ITitleRelatedTo[];
  setTitle: Dispatch<SetStateAction<ITitleRelatedTo[]>>;
}

const AddImageWithTextFiled = (props: IProps) => {
  const {images, setImages, paragraphs, setParagraphs, title, setTitle} = props;

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      const file = event.target.files[0];
      const {name} = event.target;
      const newImageUrl = URL.createObjectURL(file);

      setImages(images.map((el) => (name === el.unique ? {...el, image: file, imageUrl: newImageUrl} : el)));
    }
  };

  const appendRow = () => {
    const unique = uuid();

    setImages([...images, {image: null, imageUrl: '', unique, id: null}]);
    setTitle([...title, {value: '', relatedTo: unique, id: null}]);
  };

  const removeRow = (unique: string) => {
    setImages(images.filter((el) => el.unique !== unique));
    setParagraphs(paragraphs.filter((el) => el.relatedTo !== unique));
    setTitle(title.filter((el) => el.relatedTo !== unique));
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

  const changeTitle = (value: string, unique: string) => {
    setTitle(title.map((item) => (item.relatedTo === unique ? {...item, value} : item)));
  };

  return (
    <>
      <Button onClick={appendRow} color="first" variant="contained">
        Добавить блок с информацией
      </Button>
      {images.map((el) => (
        <Fragment key={el.unique}>
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
                <Button onClick={() => removeRow(el.unique)} color="warning" variant="outlined">
                  Удалить
                </Button>
                <>
                  <TextField
                    value={title.find((item) => item.relatedTo === el.unique)?.value}
                    onChange={(e) => changeTitle(e.target.value, el.unique)}
                    placeholder='Введите заголовок'
                    sx={{width: '100%'}}
                  />
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
        </Fragment>
      ))}
    </>
  );
};

export default AddImageWithTextFiled;
