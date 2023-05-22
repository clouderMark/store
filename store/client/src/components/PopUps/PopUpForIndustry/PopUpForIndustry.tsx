import {ChangeEvent} from 'react';
import {Box, DialogActions, Button, TextField} from '@mui/material';
import {IPopUpForIndystry} from './types/IPopUpForIndystry';
import AddTextField from '../Add/AddTextField';
import ContainerWithTwoColumns from '../../ContainerWithTwoColumns/ContainerWithTwoColumns';
import CardInputImage from '../CardInputImage/CardInputImage';
import {EType} from '../../EditIndustry/EType';
import AddOpinion from '../Add/AddOpinion';
import DialogWithTitle from '../DialogWithTitle';
import inputChange from '../handleChange';
import imageChange from '../handleImageChange';

export const PopUpForIndystry = (props: IPopUpForIndystry) => {
  const {value, dispatch} = props;

  const handleChange = inputChange(dispatch);
  const handleImageChange = imageChange(dispatch);

  return (
    <DialogWithTitle
      show={props.show}
      setShow={props.setShow}
      title={props.id ? `Редактирование ${props.cardTitle}` : `Создание ${props.cardTitle}`}
      child={
        <Box component="form" noValidate onSubmit={props.handleSubmit}>
          {props.child?.component ? props.child.component : null}
          <Box sx={{display: 'flex'}}>
            <Box sx={{width: '335px'}}>
              <CardInputImage
                value={value[EType.cardImageUrl]}
                name={EType.cardImage}
                handleImageChange={handleImageChange}
              />
              <TextField
                autoFocus={true}
                name={EType.name}
                value={value[EType.name]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                required
                error={value[EType.valid] === false}
                color={value[EType.valid] ? 'success' : 'primary'}
                placeholder={`Название ${props.cardTitle}...`}
                className="mb-3"
                sx={{width: '100%'}}
              />
            </Box>
            {!props.child ? (
              <CardInputImage
                value={value[EType.sliderImageUrl]}
                name={EType.sliderImage}
                handleImageChange={handleImageChange}
                sx={{flexGrow: 1, ml: '30px'}}
              />
            ) : null}
          </Box>
          <Box>
            <CardInputImage
              value={value[EType.headerImageUrl]}
              name={EType.headerImage}
              handleImageChange={handleImageChange}
            />
            <TextField
              name={EType.title}
              value={value[EType.title]}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              placeholder="Заголовок индустрии"
              sx={{width: '100%', mt: '30px'}}
            />
          </Box>
          <AddTextField
            paragraphs={props.paragraphs}
            setParagraphs={props.setParagraphs}
            title={'Добавить абзац'}
            placeholder={'Параграф индустрии'}
          />
          <ContainerWithTwoColumns
            firstColumn={
              <CardInputImage
                value={value[EType.infoImageUrl]}
                name={EType.infoImage}
                handleImageChange={handleImageChange}
              />
            }
            secondColumn={
              <>
                <TextField
                  name={EType.infoTitle}
                  value={value[EType.infoTitle]}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                  placeholder="Заголовок"
                  sx={{width: '100%', mt: '30px'}}
                />
                <TextField
                  name={EType.infoHeader}
                  value={value[EType.infoHeader]}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                  placeholder="Подзаголовок"
                  sx={{width: '100%', mt: '30px'}}
                />
                <TextField
                  name={EType.infoListTitle}
                  multiline
                  rows={4}
                  value={value[EType.infoListTitle]}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                  placeholder="Заголовок списка"
                  sx={{width: '100%', mt: '30px'}}
                />
                <AddTextField
                  paragraphs={props.infoListItems}
                  setParagraphs={props.setInfoListItems}
                  title={'Добавить пункт'}
                  placeholder={'Пункт списка'}
                />
                <AddTextField
                  paragraphs={props.infoParagraphs}
                  setParagraphs={props.setInfoParagraphs}
                  title={'Добавить параграф'}
                  placeholder={'Параграф'}
                />
              </>
            }
          />
          <AddOpinion
            handleChange={handleChange}
            opinionParagraphs={props.opinionParagraphs}
            setOpinionParagraphs={props.setOpinionParagraphs}
            opinionListItems={props.opinionListItems}
            setOpinionListItems={props.setOpinionListItems}
            handleImageChange={handleImageChange}
            value={value}
          />
          <DialogActions>
            <Button type="submit" variant="outlined">
              Сохранить
            </Button>
          </DialogActions>
        </Box>
      }
    />
  );
};

export default PopUpForIndystry;
