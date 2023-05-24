import {ChangeEvent, Dispatch, Fragment} from 'react';
import uuid from 'react-uuid';
import {Box, Button, IconButton, TextField, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ContainerWithTwoColumns from '../../../ContainerWithTwoColumns/ContainerWithTwoColumns';
import CardInputImage from '../../CardInputImage/CardInputImage';
import TextFieldWithIcon from '../TextFieldWithIcon';
import EInfo from './EInfo';
import IDefaultValue from './IDefaultValue';

interface IProps {
  value: IDefaultValue;
  dispatch: Dispatch<{type: EInfo; payload?: any}>; // eslint-disable-line
}

const AddImageWithTextFields = (props: IProps) => {
  const {dispatch, value} = props;

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      const file = event.target.files[0];
      const {name} = event.target;
      const newImageUrl = URL.createObjectURL(file);

      dispatch({
        type: EInfo.infoImages,
        payload: value[EInfo.infoImages].map((el) => (
          name === el.relatedTo ? {...el, image: file, imageUrl: newImageUrl} : el)),
      });
      dispatch({
        type: EInfo.imagesValid,
        payload: value[EInfo.imagesValid].map((el) => (
          name === el.relatedTo ? {...el, valid: Boolean(newImageUrl)} : el)),
      });
    }
  };

  const appendRow = () => {
    const unique = uuid();

    dispatch({
      type: EInfo.infoImages,
      payload: [...value[EInfo.infoImages], {image: null, imageUrl: '', relatedTo: unique, id: null}],
    });
    dispatch({
      type: EInfo.infoTitle,
      payload: [...value[EInfo.infoTitle], {value: '', unique, id: null}],
    });
    dispatch({
      type: EInfo.imagesValid,
      payload: [...value[EInfo.imagesValid], {valid: null, relatedTo: unique}],
    });
  };

  const removeRow = (unique: string) => {
    dispatch({
      type: EInfo.infoImages,
      payload: value[EInfo.infoImages].filter((el) => el.relatedTo !== unique),
    });
    dispatch({
      type: EInfo.infoParagraphs,
      payload: value[EInfo.infoParagraphs].filter((el) => el.relatedTo !== unique),
    });
    dispatch({
      type: EInfo.infoTitle,
      payload: value[EInfo.infoTitle].filter((el) => el.unique !== unique),
    });
    dispatch({
      type: EInfo.imagesValid,
      payload: value[EInfo.imagesValid].filter((el) => el.relatedTo !== unique),
    });
  };

  const appendParagraph = (relatedTo: string) => {
    dispatch({
      type: EInfo.infoParagraphs,
      payload: [...value[EInfo.infoParagraphs], {id: null, value: '', unique: uuid(), relatedTo}],
    });
  };

  const changeParagraph = (itemValue: string, unique: string) => {
    dispatch({
      type: EInfo.infoParagraphs,
      payload: value[EInfo.infoParagraphs].map((item) => (item.unique === unique ? {...item, value: itemValue} : item)),
    });
  };

  const removeParagraph = (unique: string) => {
    dispatch({
      type: EInfo.infoParagraphs,
      payload: value[EInfo.infoParagraphs].filter((elem) => elem.unique !== unique),
    });
  };

  const changeTitle = (itemValue: string, unique: string) => {
    dispatch({
      type: EInfo.infoTitle,
      payload: value[EInfo.infoTitle].map((item) => (item.unique === unique ? {...item, value: itemValue} : item)),
    });
  };

  return (
    <>
      <Button onClick={appendRow} color="first" variant="contained">
        Добавить блок с информацией
      </Button>
      {value[EInfo.infoTitle].map((el, i) => (
        <Fragment key={el.unique}>
          <ContainerWithTwoColumns
            firstColumn={
              <CardInputImage
                // value={value[EInfo.infoImages].find((item) => item.relatedTo === el.unique)?.imageUrl ?? ''}
                value={value[EInfo.infoImages][i].imageUrl}
                // name={value[EInfo.infoImages].find((item) => item.relatedTo === el.unique)?.relatedTo!}
                name={el.unique}
                handleImageChange={handleImageChange}
                error={value[EInfo.imagesValid][i].valid}
              />
            }
            secondColumn={
              <>
                <Button onClick={() => removeRow(el.unique)} color="warning" variant="outlined">
                  Удалить блок
                </Button>
                <>
                  <TextField
                    value={el.value}
                    onChange={(e) => changeTitle(e.target.value, el.unique)}
                    placeholder="Введите заголовок"
                    sx={{width: '100%'}}
                  />
                  <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '30px'}}>
                    <Typography component="span">Добавить абзац</Typography>
                    <IconButton color="secondary" aria-label="add" onClick={() => appendParagraph(el.unique)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  {value[EInfo.infoParagraphs]
                    .filter((elem) => elem.relatedTo === el.unique)
                    .map((item) => (
                      <TextFieldWithIcon
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

export default AddImageWithTextFields;
