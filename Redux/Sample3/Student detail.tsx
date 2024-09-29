// src/pages/studentdetails.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const StudentDetails: React.FC = () => {
  const { studentCode, mode } = useSelector((state: RootState) => state.student);

  useEffect(() => {
    if (studentCode) {
      axios.get(`/api/students/${studentCode}`).then(response => {
        // Handle the response data
      });
    }
  }, [studentCode]);

  const validationSchema = Yup.object({
    // Your validation schema
  });

  return (
    <Formik
      initialValues={{ /* Your initial values */ }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // Handle form submission
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="name" />
          {errors.name && touched.name ? <div>{errors.name}</div> : null}
          {/* Other fields */}
          <button type="submit">{mode === 'edit' ? 'Update' : 'Submit'}</button>
        </Form>
      )}
    </Formik>
  );
};

export default StudentDetails;
