// src/pages/student.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { setStudent } from '../store/studentSlice';

const StudentPage: React.FC = () => {
  const dispatch = useDispatch();

  const handleViewOrEdit = (studentCode: string, mode: 'view' | 'edit') => {
    dispatch(setStudent({ studentCode, mode }));
  };

  return (
    <div>
      {/* Your AG Grid setup */}
      <button onClick={() => handleViewOrEdit('12345', 'view')}>View</button>
      <button onClick={() => handleViewOrEdit('12345', 'edit')}>Edit</button>
    </div>
  );
};

export default StudentPage;
