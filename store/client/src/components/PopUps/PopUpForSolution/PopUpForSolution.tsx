import React, {ChangeEvent, Dispatch, SetStateAction, FormEvent} from 'react';
import {Dialog, DialogContent, DialogTitle, Box, TextField, DialogActions, Button} from '@mui/material';
import {IParagraphs} from '../../../types/types';
import SetOpinion from '../SetOpinion/SetOpinion';
import {EType} from '../../EditSolution/EType';
import {IDefaultValue} from '../../EditSolution/reducer';

interface IProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  id: number | null;
  handleImageChange(event: ChangeEvent<HTMLInputElement>): void;
  valid: boolean | null;
  handleSubmit(event: FormEvent<HTMLFormElement>): void;
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
  opinionParagraphs: IParagraphs[];
  setOpinionParagraphs: Dispatch<SetStateAction<IParagraphs[]>>;
  opinionListItems: IParagraphs[];
  setOpinionListItems: Dispatch<SetStateAction<IParagraphs[]>>;
  value: IDefaultValue;
}

const PopUpForSolutiond = (props: IProps) => {
  const {value} = props;

  return (
    <Dialog open={props.show} onClose={() => props.setShow(false)} PaperProps={{sx: {minWidth: '94%'}}}>
      <DialogTitle>{props.id ? 'Редактирование' : 'Создание'} продуктового решения</DialogTitle>

      <DialogContent>
        <Box component="form" noValidate onSubmit={props.handleSubmit}>
          <TextField
            autoFocus={true}
            name={EType.name}
            value={value[EType.name]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
            required
            error={props.valid === false}
            color={props.valid ? 'success' : 'primary'}
            placeholder={'Название продуктового решения ...'}
            className="mb-3"
            sx={{width: '100%'}}
          />
          <SetOpinion
            titleName={EType.opinionTitle}
            titleValue={value[EType.opinionTitle]}
            handleChange={props.handleChange}
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
              handleImageChange: props.handleImageChange,
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
          <DialogActions>
            <Button type="submit" variant="outlined">
              Сохранить
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PopUpForSolutiond;
