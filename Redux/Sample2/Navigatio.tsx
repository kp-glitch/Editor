import { useDispatch } from 'react-redux';
import { setProductDetails } from './productSlice';
import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleView = (code: string) => {
    dispatch(setProductDetails({ code, mode: 'view' }));
    navigate(`/productDetails`);
  };

  const handleEdit = (code: string) => {
    dispatch(setProductDetails({ code, mode: 'edit' }));
    navigate(`/productDetails`);
  };

  return { handleView, handleEdit };
};
