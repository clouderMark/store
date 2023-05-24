import {ChangeEvent} from 'react';
import {Box, DialogActions, Button, TextField} from '@mui/material';
import {IPopUpForIndystry} from './types/IPopUpForIndystry';
import CardInputImage from '../CardInputImage/CardInputImage';
import {EType} from '../../EditIndustry/EType';
import AddOpinion from '../Add/AddOpinion/AddOpinion';
import DialogWithTitle from '../DialogWithTitle';
import inputChange from '../handleChange';
import imageChange from '../handleImageChange';
import AddOneImageWithTextFields from '../Add/AddOneImageWithTextFields/AddOneImageWithTextFields';
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
          <AddHeader
            value={props.headerValue}
            dispatch={props.dispatchHeader}
          />
          <AddOneImageWithTextFields value={props.infoValue} dispatch={props.dispatchInfo} />
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
