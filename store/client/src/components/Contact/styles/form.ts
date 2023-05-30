import {theme} from '../../../styles/theme';

const tabletSize = 767;
const fontWeight = 300;
const color = theme.palette.third.main;

export const form = {
  width: '50%',
  [`@media (max-width: ${tabletSize}px)`]: {
    width: '100%',
  },
  block: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: '24px',
  },
  textField: {
    width: '48%',
    marginBottom: '20px',
    marginRight: '2%',
    [`@media (max-width: ${tabletSize}px)`]: {
      width: '100%',
      marginRight: '0',
    },
  },
  textFieldMultiline: {
    width: '98%',
    height: '114px',
    [`@media (max-width: ${tabletSize}px)`]: {
      width: '100%',
    },
  },
  label: {
    color: color,
    fontWeight: fontWeight,
    fontSize: '20px',
  },
  checkbox: {
    color: color,
    '&.Mui-checked': {
      color: color,
    },
    label: {
      fontWeight: fontWeight,
      textTransform: 'lowercase',
    },
  },
  button: {
    marginTop: '50px',
  },
  control: {
    display: 'block',
    '& .Mui-error svg': {
      color: 'red',
    },
  },
};

const textField = {
  '& .MuiInputBase-root': {
    color: color,
    fontWeight: fontWeight,
    borderRadius: 0,
    '& fieldset': {
      borderColor: theme.palette.third.light,
    },
    '&:hover fieldset': {
      borderColor: color,
      borderWidth: '2px',
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: color,
      },
    },
  },
};

Object.assign(form.textField, textField);
Object.assign(form.textFieldMultiline, textField);
