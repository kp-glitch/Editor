import React, { useEffect, useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useFetchData } from './hooks/useFetchData';
import { useNavigation } from './hooks/useNavigation';
import { deleteProduct } from './service';
import ActionButtons from './ActionButtons';

const Product: React.FC = () => {
  const rowData = useFetchData();
  const { handleView, handleEdit } = useNavigation();
  const [data, setData] = useState(rowData);

  const handleDelete = async (code: string) => {
    await deleteProduct(code);
    setData(data.filter(item => item.productcode !== code));
  };

  const columnDefs = useMemo(() => [
    { headerName: 'Code', field: 'productcode' },
    { headerName: 'Label', field: 'label' },
    { headerName: 'Status', field: 'status' },
    { headerName: 'Date', field: 'date' },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRendererFramework: (params) => (
        <ActionButtons
          code={params.data.productcode}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )
    }
  ], [handleView, handleEdit, handleDelete]);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
      />
    </div>
  );
};

export default Product;
