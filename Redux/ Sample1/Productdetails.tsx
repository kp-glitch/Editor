import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { fetchProductDetails, updateProduct } from './service';
import MuiTextField from './MuiTextField';
import Dropdown from './Dropdown';
import Datepicker from './Datepicker';

const ProductDetails: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const { state } = useLocation<{ mode: string }>();
  const [initialValues, setInitialValues] = useState({ productcode: '', label: '', status: '', date: '' });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProductDetails(code);
      setInitialValues(data);
    };
    fetchData();
  }, [code]);

  const validationSchema = Yup.object().shape({
    productcode: Yup.string().required('Product Code is required'),
    label: Yup.string().required('Product Label is required'),
    status: Yup.string().required('Status is required'),
    date: Yup.date().required('Date is required'),
  });

  const handleSubmit = async (values: any) => {
    await updateProduct(code, values);
    // Handle post-update logic here
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="productcode" component={MuiTextField} label="Product Code" readOnly={state.mode === 'view'} />
          <ErrorMessage name="productcode" component="div" className="error" />

          <Field name="label" component={MuiTextField} label="Product Label" readOnly={state.mode === 'view'} />
          <ErrorMessage name="label" component="div" className="error" />

          <Field name="status" component={Dropdown} label="Status" options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} readOnly={state.mode === 'view'} />
          <ErrorMessage name="status" component="div" className="error" />

          <Field name="date" component={Datepicker} label="Date" readOnly={state.mode === 'view'} />
          <ErrorMessage name="date" component="div" className="error" />

          {state.mode === 'edit' && <button type="submit" disabled={isSubmitting}>Save</button>}
        </Form>
      )}
    </Formik>
  );
};

export default ProductDetails;
