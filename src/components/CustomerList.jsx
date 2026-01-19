import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Typography, Box } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
      .then(res => res.json())
      .then(data => setCustomers(data._embedded.customers))
      .catch(err => console.error(err));
  }, []);

  const [columnDefs] = useState([
    { field: 'firstname', filter: true, sortable: true, flex: 1 },
    { field: 'lastname', filter: true, sortable: true, flex: 1 },
    { field: 'streetaddress', filter: true, sortable: true, flex: 1.5 },
    { field: 'postcode', filter: true, sortable: true, flex: 0.8 },
    { field: 'city', filter: true, sortable: true, flex: 1 },
    { field: 'email', filter: true, sortable: true, flex: 1.5 },
    { field: 'phone', filter: true, sortable: true, flex: 1.2 },
  ]);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#fff' }}>Customers</Typography>
      <div className="ag-theme-material" style={{ height: 650, width: '100%' }}>
        <AgGridReact 
          rowData={customers} 
          columnDefs={columnDefs} 
          pagination={true} 
          paginationPageSize={50} 
          paginationPageSizeSelector={[10, 20, 50, 100]}
          autoSizeStrategy={{ type: 'fitGridWidth' }}
        />
      </div>
    </Box>
  );
}

export default CustomerList;