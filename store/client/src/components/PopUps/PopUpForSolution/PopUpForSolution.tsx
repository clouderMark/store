import {ChangeEvent, Dispatch, SetStateAction, FormEvent, Fragment} from 'react';
import {Box, TextField, DialogActions, Button} from '@mui/material';
import AddOpinion from '../Add/AddOpinion';
import {EType} from '../../EditSolution/EType';
import DialogWithTitle from '../DialogWithTitle';
import IDefaultValue from '../../EditSolution/IDefaultValue';
import inputChange from '../handleChange';
import imageChange from '../handleImageChange';

interface IProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  id: number | null;
  handleSubmit(event: FormEvent<HTMLFormElement>): void;
  value: IDefaultValue;
  dispatch: Dispatch<{type: string; payload?: any}>; // eslint-disable-line
  child?: JSX.Element[];
}

const PopUpForSolutiond = (props: IProps) => {
  const {value, dispatch} = props;

  const handleChange = inputChange(dispatch);
  const handleImageChange = imageChange(dispatch);

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
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            value={value}
            dispatch={dispatch}
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
