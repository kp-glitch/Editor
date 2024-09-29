import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const handleView = (code: string) => {
    navigate(`/productDetails/${code}`, { state: { mode: 'view' } });
  };

  const handleEdit = (code: string) => {
    navigate(`/productDetails/${code}`, { state: { mode: 'edit' } });
  };

  return { handleView, handleEdit };
};
