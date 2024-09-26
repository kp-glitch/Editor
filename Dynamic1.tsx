
// fieldAttributes.js
export const fields = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    readOnly: false,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    readOnly: false,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    readOnly: false,
  },
  {
    name: 'gender',
    label: 'Gender',
    type: 'dropdown',
    options: ['Male', 'Female', 'Other'],
    readOnly: false,
  },
  {
    name: 'dob',
    label: 'Date of Birth',
    type: 'datepicker',
    readOnly: false,
  },
];



// DynamicForm.js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { fields } from './fieldAttributes';
import { TextField, Select, MenuItem } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  gender: Yup.string().required('Gender is required'),
  dob: Yup.date().required('Date of Birth is required'),
});

const renderField = (field) => {
  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
      return (
        <Field
          name={field.name}
          as={TextField}
          label={field.label}
          type={field.type}
          InputProps={{ readOnly: field.readOnly }}
          fullWidth
        />
      );
    case 'dropdown':
      return (
        <Field name={field.name} as={Select} label={field.label} fullWidth>
          {field.options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Field>
      );
    case 'datepicker':
      return (
        <Field name={field.name}>
          {({ field, form }) => (
            <DatePicker
              label={field.label}
              value={field.value}
              onChange={(date) => form.setFieldValue(field.name, date)}
              renderInput={(props) => <TextField {...props} fullWidth />}
            />
          )}
        </Field>
      );
    default:
      return null;
  }
};

const DynamicForm = () => {
  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        gender: '',
        dob: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          {fields.map((field) => (
            <div key={field.name}>
              {renderField(field)}
              {errors[field.name] && touched[field.name] && (
                <div style={{ color: 'red' }}>{errors[field.name]}</div>
              )}
            </div>
          ))}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
