import React from 'react';
import { TextField } from '@mui/material';
import { FieldProps } from 'formik';
import { styled } from '@mui/system';

interface MuiTextFieldProps extends FieldProps {
  label: string;
  required?: boolean;
  readOnly?: boolean;
}

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'transparent', // Remove the light blue background
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-outlined': {
    fontSize: '14px', // Default label font size
  },
  '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
    fontSize: '12px', // Floating label font size
  },
  '& .MuiInputBase-input': {
    fontSize: '16px', // Text font size
  },
}));

const MuiTextField: React.FC<MuiTextFieldProps> = ({
  field,
  form,
  label,
  required = false,
  readOnly = false,
  ...props
}) => {
  return (
    <CustomTextField
      {...field}
      {...props}
      label={label}
      required={required}
      InputProps={{
        readOnly: readOnly,
      }}
      error={Boolean(form.errors[field.name] && form.touched[field.name])}
      helperText={form.touched[field.name] && form.errors[field.name]}
      variant="outlined"
      fullWidth
    />
  );
};

export default MuiTextField;


///////////////

import React from 'react';
import { TextField } from '@mui/material';
import { FieldProps } from 'formik';
import { styled } from '@mui/system';

interface MuiTextFieldProps extends FieldProps {
  label: string;
  required?: boolean;
  readOnly?: boolean;
}

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInput-underline:before': {
    borderBottomColor: 'yourColorHere', // Change this to your desired border color
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: 'yourColorHere', // Change this to your desired border color on hover
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'yourColorHere', // Change this to your desired border color when focused
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'yourColorHere', // Change this to your desired label color when focused
  },
  '& .MuiInputLabel-root': {
    fontSize: '14px',
  },
  '& .MuiInputLabel-root.MuiInputLabel-shrink': {
    fontSize: '12px',
  },
  '& .MuiInputBase-input': {
    fontSize: '16px',
  },
}));

const MuiTextField: React.FC<MuiTextFieldProps> = ({
  field,
  form,
  label,
  required = false,
  readOnly = false,
  ...props
}) => {
  return (
    <CustomTextField
      {...field}
      {...props}
      label={label}
      required={required}
      InputProps={{
        readOnly: readOnly,
      }}
      error={Boolean(form.errors[field.name] && form.touched[field.name])}
      helperText={form.touched[field.name] && form.errors[field.name]}
      variant="standard" // Changed to "standard"
      fullWidth
    />
  );
};

export default MuiTextField;

