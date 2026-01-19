import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Typography, Box, IconButton, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Customer } from '../types';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import { ColDef, ICellRendererParams } from 'ag-grid-community';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [snackbar, setSnackbar] = useState({ open: false, msg: "" });

  const fetchData = () => {
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
      .then(res => res.json()).then(data => setCustomers(data._embedded.customers));
  };

  useEffect(() => { fetchData(); }, []);

  const deleteCustomer = (url: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      fetch(url, { method: 'DELETE' }).then(() => {
        setSnackbar({ open: true, msg: "Customer deleted successfully" });
        fetchData();
      });
    }
  };

  const [columnDefs] = useState<ColDef<Customer>[]>([
    {
      headerName: 'Actions',
      width: 180,
      pinned: 'right',
      cellRenderer: (params: ICellRendererParams) => (
        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <EditCustomer customer={params.data} updateCustomer={fetchData} />
          <IconButton color="error" size="small" onClick={() => deleteCustomer(params.data._links.self.href)}><DeleteIcon /></IconButton>
          <AddTraining customer={params.data} />
        </Box>
      )
    },
    { field: 'firstname', filter: true, sortable: true, flex: 1 },
    { field: 'lastname', filter: true, sortable: true, flex: 1 },
    { field: 'email', flex: 1.5 },
    { field: 'phone', flex: 1 },
    { field: 'city', flex: 1 },
  ]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Customers</Typography>
        <AddCustomer saveCustomer={fetchData} />
      </Box>
      <div className="ag-theme-material" style={{ height: 600, width: '100%' }}>
        <AgGridReact rowData={customers} columnDefs={columnDefs} pagination={true} paginationPageSize={50} autoSizeStrategy={{ type: 'fitGridWidth' }} />
      </div>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity="success">{snackbar.msg}</Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomerList;