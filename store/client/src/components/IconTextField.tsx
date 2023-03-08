import {TextField, InputAdornment} from '@mui/material';

interface IProps {
  icon: JSX.Element;
  label: string;
  variant: 'standard' | 'filled' | 'outlined' | undefined;
  sx: {[key: string]: string | number | {[key: string]: string | number}}
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
