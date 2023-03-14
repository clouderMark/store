export const form = {
  width: '50%',
  block: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  textField: {
    width: '48%',
    marginBottom: '20px',
    marginRight: '2%',
  },
  textFieldMultiline: {
    width: '98%',
    height: '114px',
  },
  label: {
    color: 'white',
    fontWeight: 300,
    fontSize: '20px',
  },
  checkbox: {
    color: 'white',
    '&.Mui-checked': {
      color: 'white',
    },
    label: {
      fontWeight: 300,
      textTransform: 'lowercase',
    },
  },
};

const textField = {
  '& .MuiInputBase-root': {
    color: 'white',
    fontWeight: 300,
    borderRadius: 0,
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.6)',
    },
    '&:hover fieldset': {
      borderColor: 'white',
      borderWidth: '2px',
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
      },
    },
  },
};

Object.assign(form.textField, textField);
Object.assign(form.textFieldMultiline, textField);
