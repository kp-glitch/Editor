import React from 'react';
import { Formik, Form, Field } from 'formik';
import Textfield from './Textfield';

const Equipment: React.FC = () => {
  return (
    <Formik
      initialValues={{ equipmentName: '' }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field
            name="equipmentName"
            component={Textfield}
            label="Equipment Name"
            readOnly={false}
            required={true}
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default Equipment;
/////////////////////////////////////////////////////////////
import React, { useState } from 'react';
import './textField.css';

interface TextfieldProps {
  label: string;
  field: any;
  form: any;
  readOnly: boolean;
  required?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const Textfield: React.FC<TextfieldProps> = ({ label, field, form, required, inputProps, readOnly }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (field.value === '') {
      setIsFocused(false);
    }
  };

  return (
    <div className="formGroup">
      <input
        {...field}
        readOnly={readOnly}
        onFocus={handleFocus}
        onBlur={(e) => {
          handleBlur();
          field.onBlur(e);
        }}
        className={isFocused || field.value !== '' ? 'formField focused' : 'formField'}
        placeholder=""
        {...inputProps}
      />
      <label
        className={
          required
            ? isFocused || field.value !== ''
              ? 'formLabel focused'
              : 'formLabelError'
            : isFocused || field.value !== ''
            ? 'formLabel focused'
            : 'formLabel'
        }
      >
        {label}
      </label>
    </div>
  );
};

export default Textfield;
///////////////////////////////////////////////////////////



import React from 'react';
import { Formik, Form, Field } from 'formik';
import Textfield from './Textfield';
import Dropdown from './Dropdown';

const Equipment: React.FC = () => {
  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <Formik
      initialValues={{ equipmentName: '', equipmentType: '' }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field
            name="equipmentName"
            component={Textfield}
            label="Equipment Name"
            readOnly={false}
            required={true}
          />
          <Field
            name="equipmentType"
            component={Dropdown}
            label="Equipment Type"
            options={dropdownOptions}
            readOnly={false}
            required={true}
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default Equipment;

/////////////////////////////////////////////////////////////

import React from 'react';
import './FloatingLabelDropdown.css';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  field: any;
  form: any;
  options: DropdownOption[];
  required?: boolean;
  readOnly?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ label, field, form, options, required, readOnly }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    form.setFieldValue(field.name, e.target.value);
  };

  return (
    <div className="dropdown">
      <label htmlFor={field.name} className={`label ${field.value && 'filled'}`}>{label}</label>
      <select
        id={field.name}
        {...field}
        onChange={handleChange}
        disabled={readOnly}
      >
        <option value=""> </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
///////////////////////////////////////////////////////


import React from 'react';
import { Formik, Form, Field } from 'formik';
import Textfield from './Textfield';
import Dropdown from './Dropdown';
import Datepicker from './Datepicker';

const Equipment: React.FC = () => {
  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <Formik
      initialValues={{ equipmentName: '', equipmentType: '', purchaseDate: null }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field
            name="equipmentName"
            component={Textfield}
            label="Equipment Name"
            readOnly={false}
            required={true}
          />
          <Field
            name="equipmentType"
            component={Dropdown}
            label="Equipment Type"
            options={dropdownOptions}
            readOnly={false}
            required={true}
          />
          <Field
            name="purchaseDate"
            component={Datepicker}
            label="Purchase Date"
            showTimeSelect={false}
            required={true}
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default Equipment;

///////////////////////////////////////////////////

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.css';

interface DatepickerProps {
  label: string;
  field: any;
  form: any;
  required?: boolean;
  showTimeSelect?: boolean;
}

const Datepicker: React.FC<DatepickerProps> = ({ label, field, form, required, showTimeSelect }) => {
  const handleDateChange = (date: Date | null) => {
    form.setFieldValue(field.name, date);
  };

  return (
    <div className="datepicker-container">
      <DatePicker
        id={field.name}
        selected={field.value}
        onChange={handleDateChange}
        className="datepicker-input"
        required={required}
        showTimeSelect={showTimeSelect}
        timeFormat="HH:mm"
        dateFormat={showTimeSelect ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"}
      />
      <label htmlFor={field.name} className={`floating-label ${field.value ? 'filled' : ''}`}>
        {label}
      </label>
    </div>
  );
};

export default Datepicker;

///////////////////////////////////////////////////////////




import React from 'react';
import { Formik, Form, Field } from 'formik';
import Textfield from './Textfield';
import Dropdown from './Dropdown';
import Datepicker from './Datepicker';

const Equipment: React.FC = () => {
  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const handleBack = () => {
    // Implement your back navigation logic here
    console.log('Back button clicked');
  };

  return (
    <Formik
      initialValues={{ equipmentName: '', equipmentType: '', purchaseDate: null }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field
            name="equipmentName"
            component={Textfield}
            label="Equipment Name"
            readOnly={false}
            required={true}
          />
          <Field
            name="equipmentType"
            component={Dropdown}
            label="Equipment Type"
            options={dropdownOptions}
            readOnly={false}
            required={true}
          />
          <Field
            name="purchaseDate"
            component={Datepicker}
            label="Purchase Date"
            showTimeSelect={false}
            required={true}
          />
          <div className="button-group">
            <button type="button" onClick={handleBack}>Back</button>
            <button type="submit">Save</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Equipment;
/////////////////////////////////////////
vaidation
///////////////////////////////////////////////

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Textfield from './Textfield';
import Dropdown from './Dropdown';
import Datepicker from './Datepicker';

const Equipment: React.FC = () => {
  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const validationSchema = Yup.object().shape({
    equipmentName: Yup.string()
      .required('Equipment Name is required')
      .min(2, 'Equipment Name must be at least 2 characters'),
    equipmentType: Yup.string()
      .required('Equipment Type is required'),
    purchaseDate: Yup.date()
      .required('Purchase Date is required')
      .nullable(),
  });

  const handleBack = () => {
    // Implement your back navigation logic here
    console.log('Back button clicked');
  };

  return (
    <Formik
      initialValues={{ equipmentName: '', equipmentType: '', purchaseDate: null }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, validateForm }) => (
        <Form onSubmit={handleSubmit}>
          <Field
            name="equipmentName"
            component={Textfield}
            label="Equipment Name"
            readOnly={false}
            required={true}
          />
          <ErrorMessage name="equipmentName" component="div" className="error" />
          
          <Field
            name="equipmentType"
            component={Dropdown}
            label="Equipment Type"
            options={dropdownOptions}
            readOnly={false}
            required={true}
          />
          <ErrorMessage name="equipmentType" component="div" className="error" />
          
          <Field
            name="purchaseDate"
            component={Datepicker}
            label="Purchase Date"
            showTimeSelect={false}
            required={true}
          />
          <ErrorMessage name="purchaseDate" component="div" className="error" />
          
          <div className="button-group">
            <button type="button" onClick={handleBack}>Back</button>
            <button
              type="submit"
              onClick={() => validateForm()}
            >
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Equipment;

//////////////////////////////////////////

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.button-group button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}


