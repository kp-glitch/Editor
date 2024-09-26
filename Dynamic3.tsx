/* Define the main container */
.container {
  display: grid;
  gap: 20px; /* Vertical space between sections */
  padding: 20px;
}

/* Define each section */
.section {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Space between fields within a section */
}

/* Define field styles */
.field {
  flex: 1;
  min-width: 150px; /* Minimum width for fields */
}

.field.amount {
  flex: 0 0 100px; /* Fixed width for amount field */
}

.field.description {
  flex: 2; /* Larger width for description field */
}

/* Responsive adjustments */
@media (min-width: 1200px) {
  .container {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .container {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .container {
    grid-template-columns: 1fr;
  }
}
/////////////////////
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
          className={`field ${field.name}`}
        />
      );
    case 'dropdown':
      return (
        <Field name={field.name} as={Select} label={field.label} fullWidth className={`field ${field.name}`}>
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
              renderInput={(props) => <TextField {...props} fullWidth className={`field ${field.name}`} />}
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
        <Form className="container">
          <div className="section">
            {fields.slice(0, 5).map((field) => (
              <div key={field.name} className={`grid-item ${field.name}`}>
                {renderField(field)}
                {errors[field.name] && touched[field.name] && (
                  <div style={{ color: 'red' }}>{errors[field.name]}</div>
                )}
              </div>
            ))}
          </div>
          <div className="section">
            {fields.slice(5, 10).map((field) => (
              <div key={field.name} className={`grid-item ${field.name}`}>
                {renderField(field)}
                {errors[field.name] && touched[field.name] && (
                  <div style={{ color: 'red' }}>{errors[field.name]}</div>
                )}
              </div>
            ))}
          </div>
          <div className="section">
            {fields.slice(10, 15).map((field) => (
              <div key={field.name} className={`grid-item ${field.name}`}>
                {renderField(field)}
                {errors[field.name] && touched[field.name] && (
                  <div style={{ color: 'red' }}>{errors[field.name]}</div>
                )}
              </div>
            ))}
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
/////////////////////////////

/* DynamicForm.css */
.container {
  display: grid;
  gap: 20px; /* Vertical space between sections */
  padding: 20px;
}

.section {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Space between fields within a section */
}

.field {
  flex: 1;
  min-width: 150px; /* Minimum width for fields */
}

.field.amount {
  flex: 0 0 100px; /* Fixed width for amount field */
}

.field.description {
  flex: 2; /* Larger width for description field */
}

@media (min-width: 1200px) {
  .container {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .container {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .container {
    grid-template-columns: 1fr;
  }
}
