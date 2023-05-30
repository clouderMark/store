import {Dispatch, SetStateAction} from 'react';
import {Dialog, DialogContent, DialogTitle} from '@mui/material';

interface IProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  title: string;
  child: JSX.Element;
}

const DialogWithTitle = (props: IProps) => {
  const {show, setShow, title, child} = props;

  return (
    <Dialog open={show} onClose={() => setShow(false)} PaperProps={{sx: {minWidth: '94%'}}}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        {child}
      </DialogContent>
    </Dialog>
  );
};

export default DialogWithTitle;
