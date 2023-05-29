import {ChangeEvent} from 'react';
import {Box, DialogActions, Button, TextField, Typography} from '@mui/material';
import {IPopUpForIndystry} from './types/IPopUpForIndystry';
import CardInputImage from '../CardInputImage/CardInputImage';
import {EType} from '../../EditIndustry/EType';
import AddOpinion from '../Add/AddOpinion/AddOpinion';
import DialogWithTitle from '../DialogWithTitle';
import inputChange from '../handleChange';
import imageChange from '../handleImageChange';
import AddInfo from '../Add/AddInfo/AddInfo';
import AddHeader from '../Add/AddHeader/AddHeader';

export const PopUpForIndystry = (props: IPopUpForIndystry) => {
  const {value, dispatch, opinionValue, dispatchOpinion} = props;

  const handleChange = inputChange(dispatch);
  const handleImageChange = imageChange(dispatch);

  return (
    <DialogWithTitle
      show={props.show}
      setShow={props.setShow}
      title={props.id ? `Редактирование ${props.cardTitle}` : `Создание ${props.cardTitle}`}
      child={
        <Box component="form" noValidate onSubmit={props.handleSubmit}>
          {props.child?.component ? (
            <Box sx={{mb: '20px'}}>
              <Typography>Относящаяся к</Typography>
              {props.child.component}
            </Box>
          ) : null}
          <Box sx={{display: 'flex'}}>
            <Box display={'flex'}>
              <Typography sx={{mr: '10px', writingMode: 'vertical-rl'}}>Карточка с названием</Typography>
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
            </Box>
            {!props.child ? (
              <Box sx={{flexGrow: 1, display: 'flex', ml: '30px'}}>
                <Typography sx={{mr: '10px', writingMode: 'vertical-rl'}}>Изображние для слайдера</Typography>
                <CardInputImage
                  value={value[EType.sliderImageUrl]}
                  name={EType.sliderImage}
                  handleImageChange={handleImageChange}
                  sx={{flexGrow: 1}}
                />
              </Box>
            ) : null}
          </Box>
          <AddHeader value={props.headerValue} dispatch={props.dispatchHeader} />
          <AddInfo value={props.infoValue} dispatch={props.dispatchInfo} />
          <AddOpinion value={opinionValue} dispatch={dispatchOpinion} />
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
