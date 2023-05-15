import {ChangeEvent, Dispatch, SetStateAction, FormEvent, Fragment} from 'react';
import {Box, TextField, DialogActions, Button} from '@mui/material';
import {IParagraphs} from '../../../types/types';
import AddOpinion from '../Add/AddOpinion';
import {EType} from '../../EditSolution/EType';
import DialogWithTitle from '../DialogWithTitle';
import IDefaultValue from '../../EditSolution/IDefaultValue';

interface IProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  id: number | null;
  handleSubmit(event: FormEvent<HTMLFormElement>): void;
  opinionParagraphs: IParagraphs[];
  setOpinionParagraphs: Dispatch<SetStateAction<IParagraphs[]>>;
  opinionListItems: IParagraphs[];
  setOpinionListItems: Dispatch<SetStateAction<IParagraphs[]>>;
  value: IDefaultValue;
  dispatch: Dispatch<{type: string; payload?: any}>; // eslint-disable-line
  child?: JSX.Element[];
}

const PopUpForSolutiond = (props: IProps) => {
  const {value, dispatch} = props;

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      const file = event.target.files[0];
      const {name} = event.target;
      const newImageUrl = URL.createObjectURL(file);

      dispatch({type: name, payload: file});
      dispatch({type: `${name}Url`, payload: newImageUrl});
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name} = event.target;
    const {value} = event.target;

    if (name === EType.name) {
      dispatch({type: EType.valid, payload: value.trim() !== ''});
    }

    dispatch({type: name, payload: value});
  };

  return (
    <DialogWithTitle
      show={props.show}
      setShow={props.setShow}
      title={props.id ? 'Редактирование продуктового решения' : 'Создание продуктового решения'}
      child={
        <Box component="form" noValidate onSubmit={props.handleSubmit}>
          <TextField
            autoFocus={true}
            name={EType.name}
            value={value[EType.name]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            required
            error={value[EType.valid] === false}
            color={value[EType.valid] ? 'success' : 'primary'}
            placeholder={'Название продуктового решения ...'}
            className="mb-3"
            sx={{width: '100%'}}
          />
          <AddOpinion
            titleName={EType.opinionTitle}
            titleValue={value[EType.opinionTitle]}
            handleChange={handleChange}
            opinionParagraphs={props.opinionParagraphs}
            setOpinionParagraphs={props.setOpinionParagraphs}
            listTitleName={EType.opinionListTitle}
            listTitleValue={value[EType.opinionListTitle]}
            opinionListItems={props.opinionListItems}
            setOpinionListItems={props.setOpinionListItems}
            image={{
              id: props.id,
              image: props.value[EType.opinionImageUrl],
              name: EType.opinionImage,
              handleImageChange: handleImageChange,
            }}
            nameName={EType.opinionName}
            nameValue={value[EType.opinionName]}
            phoneName={EType.opinionPhone}
            phoneValue={value[EType.opinionPhone]}
            faxName={EType.opinionFax}
            faxValue={value[EType.opinionFax]}
            emailName={EType.opinionEmail}
            emailValue={value[EType.opinionEmail]}
          />
          {props.child?.map((el, i) => (
            <Fragment key={i}>
              {el}
            </Fragment>
          ))}
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

export default PopUpForSolutiond;
