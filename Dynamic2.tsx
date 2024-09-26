/* Define the grid container */
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  padding: 20px;
}

/* Define the grid items */
.grid-item {
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* Responsive layout for larger screens */
@media (min-width: 1200px) {
  .grid-container {
    grid-template-columns: repeat(5, 1fr);
  }
}

/* Responsive layout for medium screens */
@media (min-width: 992px) and (max-width: 1199px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Responsive layout for smaller desktop screens */
@media (min-width: 768px) and (max-width: 991px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

///////////////////////

// DynamicForm.js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { fields } from './fieldAttributes';
import { TextField, Select, MenuItem } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import './DynamicForm.css'; // Import the CSS file

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
        <Form className="grid-container">
          {fields.map((field) => (
            <div key={field.name} className="grid-item">
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

/////////////////////////
/* DynamicForm.css */
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  padding: 20px;
}

.grid-item {
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

@media (min-width: 1200px) {
  .grid-container {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
