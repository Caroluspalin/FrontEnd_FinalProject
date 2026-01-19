import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
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
    { field: 'firstname', filter: true, sortable: true },
    { field: 'lastname', filter: true, sortable: true },
    { field: 'streetaddress', filter: true, sortable: true },
    { field: 'postcode', filter: true, sortable: true },
    { field: 'city', filter: true, sortable: true },
    { field: 'email', filter: true, sortable: true },
    { field: 'phone', filter: true, sortable: true },
  ]);

  return (
    <div className="ag-theme-material" style={{ height: 600, width: '100%' }}>
      <AgGridReact 
        rowData={customers} 
        columnDefs={columnDefs} 
        pagination={true} 
        paginationPageSize={10} 
      />
    </div>
  );
}

export default CustomerList;