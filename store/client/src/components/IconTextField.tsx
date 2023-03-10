import {TextField, InputAdornment} from '@mui/material';

interface IProps {
  icon: JSX.Element;
  label: string;
  variant: 'standard' | 'filled' | 'outlined' | undefined; // eslint-disable-next-line
  sx: {[key: string]: any};
}

export const IconTextField = (props: IProps) => (
  <TextField
    label={props.label}
    variant={props.variant}
    sx={props.sx}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          {props.icon}
        </InputAdornment>
      ),
    }}
  />
);
