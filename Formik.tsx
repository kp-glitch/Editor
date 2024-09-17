const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required'),
  age: Yup.number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  gender: Yup.string()
    .required('Gender is required'),
  dob: Yup.date()
    .required('Date of Birth is required')
    .nullable()
});

/////////////////////////

const StudentForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      gender: '',
      dob: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log('Form data', values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        id="name"
        name="name"
        type="text"
        label="Name"
        onChange={formik.handleChange}
        value={formik.values.name}
        onBlur={formik.handleBlur}
      />
      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
      ) : null}

      <Input
        id="age"
        name="age"
        type="number"
        label="Age"
        onChange={formik.handleChange}
        value={formik.values.age}
        onBlur={formik.handleBlur}
      />
      {formik.touched.age && formik.errors.age ? (
        <div>{formik.errors.age}</div>
      ) : null}

      <Dropdown
        id="gender"
        name="gender"
        label="Gender"
        options={['Male', 'Female', 'Other']}
        onChange={formik.handleChange}
        value={formik.values.gender}
        onBlur={formik.handleBlur}
      />
      {formik.touched.gender && formik.errors.gender ? (
        <div>{formik.errors.gender}</div>
      ) : null}

      <Datepicker
        id="dob"
        name="dob"
        label="Date of Birth"
        onChange={formik.handleChange}
        value={formik.values.dob}
        onBlur={formik.handleBlur}
      />
      {formik.touched.dob && formik.errors.dob ? (
        <div>{formik.errors.dob}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
};

export default StudentForm;
/////////////////////////

const Input = ({ id, name, type, label, onChange, value, onBlur }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      name={name}
      type={type}
      onChange={onChange}
      value={value}
      onBlur={onBlur}
    />
  </div>
);

export default Input;
/////////////////////////
///////set values

import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from './input';
import Dropdown from './dropdown';
import Datepicker from './Datepicker';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  age: Yup.number().required('Age is required').positive('Age must be a positive number').integer('Age must be an integer'),
  gender: Yup.string().required('Gender is required'),
  dob: Yup.date().required('Date of Birth is required').nullable(),
});

const StudentForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      gender: '',
      dob: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log('Form data', values);
    }
  });

  useEffect(() => {
    // Simulate an API call
    const fetchData = async () => {
      const response = await fetch('https://api.example.com/student/1');
      const data = await response.json();

      // Update form values
      formik.setValues({
        name: data.name,
        age: data.age,
        gender: data.gender,
        dob: data.dob
      });
    };

    fetchData();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        id="name"
        name="name"
        type="text"
        label="Name"
        onChange={formik.handleChange}
        value={formik.values.name}
        onBlur={formik.handleBlur}
      />
      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
      ) : null}

      <Input
        id="age"
        name="age"
        type="number"
        label="Age"
        onChange={formik.handleChange}
        value={formik.values.age}
        onBlur={formik.handleBlur}
      />
      {formik.touched.age && formik.errors.age ? (
        <div>{formik.errors.age}</div>
      ) : null}

      <Dropdown
        id="gender"
        name="gender"
        label="Gender"
        options={['Male', 'Female', Other']}
        onChange={formik.handleChange}
        value={formik.values.gender}
        onBlur={formik.handleBlur}
      />
      {formik.touched.gender && formik.errors.gender ? (
        <div>{formik.errors.gender}</div>
      ) : null}

      <Datepicker
        id="dob"
        name="dob"
        label="Date of Birth"
        onChange={formik.handleChange}
        value={formik.values.dob}
        onBlur={formik.handleBlur}
      />
      {formik.touched.dob && formik.errors.dob ? (
        <div>{formik.errors.dob}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
};

export default StudentForm;
