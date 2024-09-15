import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useProduct } from './productContext';
import { fetchProductDetails, updateProduct, createProduct } from './service';
import FloatingLabelDropdown from './FloatingLabelDropdown';
import Datepicker from './Datepicker';

interface LocationState {
  mode: string;
}

const parseDate = (dateString: string): Date | null => {
  if (!dateString) return null;
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const ProductDetails: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const { state: productContext } = useProduct();
  const [localProduct, setLocalProduct] = useState<any>(null);

  useEffect(() => {
    if (state.mode === 'new') {
      setLocalProduct({
        code: '',
        label: '',
        status: 'active',
        startDate: null,
      });
    } else {
      const loadProduct = async () => {
        if (productContext && productContext.code) {
          const productDetails = await fetchProductDetails(productContext.code);
          if (productDetails) {
            setLocalProduct(productDetails);
          } else {
            console.error('Product details not found');
          }
        }
      };
      loadProduct();
    }
  }, [productContext, state.mode]);

  const handleSave = async () => {
    if (localProduct) {
      if (state.mode === 'new') {
        await createProduct(localProduct);
      } else {
        await updateProduct(localProduct.code, localProduct);
      }
      // Handle post-save actions (e.g., navigate back or show a success message)
    }
  };

  const handleDateChange = (date: Date | null) => {
    setLocalProduct({ ...localProduct, startDate: date ? date.toISOString().split('T')[0] : null });
  };

  const handleStatusChange = (status: string) => {
    setLocalProduct({ ...localProduct, status });
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalProduct({ ...localProduct, code: e.target.value });
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalProduct({ ...localProduct, label: e.target.value });
  };

  return (
    <div>
      <h1>Product Details</h1>
      <div>
        <label>Code: </label>
        <input value={localProduct?.code} onChange={handleCodeChange} />
      </div>
      <div>
        <label>Label: </label>
        <input value={localProduct?.label} onChange={handleLabelChange} />
      </div>
      <div>
        <label>Status: </label>
        <FloatingLabelDropdown
          label="Status"
          options={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' }
          ]}
          selectedValue={localProduct?.status || ''}
          setSelectedValue={handleStatusChange}
        />
      </div>
      <div>
        <label>Start Date: </label>
        <Datepicker
          label="Start Date"
          selectedDate={parseDate(localProduct?.startDate)}
          onDateChange={handleDateChange}
        />
      </div>
      {state.mode === 'edit' && <button onClick={handleSave}>Save</button>}
      {state.mode === 'new' && <button onClick={handleSave}>Create</button>}
    </div>
  );
};

export default ProductDetails;
/////////////////////////////////////////////////////////

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Product: React.FC = () => {
  const navigate = useNavigate();

  const handleNewProduct = () => {
    navigate('/productDetails', { state: { mode: 'new' } });
  };

  return (
    <div>
      <h1>Products</h1>
      <button onClick={handleNewProduct}>New Product</button>
      {/* Other product listing code */}
    </div>
  );
};

export default Product;
