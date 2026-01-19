import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';
import { Typography, Box } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function TrainingList() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings');
      const data = await response.json();
      const rawTrainings = data._embedded.trainings;

      const enrichedTrainings = await Promise.all(
        rawTrainings.map(async (training) => {
          const customerRes = await fetch(training._links.customer.href);
          const customerData = await customerRes.json();
          return {
            ...training,
            customerName: `${customerData.firstname} ${customerData.lastname}`
          };
        })
      );
      setTrainings(enrichedTrainings);
    } catch (err) {
      console.error("Error fetching trainings:", err);
    }
  };

  const [columnDefs] = useState([
    { 
      headerName: 'Date', 
      field: 'date', 
      filter: true, 
      sortable: true,
      flex: 1.2,
      valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY HH:mm')
    },
    { field: 'duration', headerName: 'Duration (min)', filter: true, sortable: true, flex: 1 },
    { field: 'activity', filter: true, sortable: true, flex: 1.2 },
    { 
      headerName: 'Customer', 
      field: 'customerName', 
      filter: true, 
      sortable: true,
      flex: 1.5
    },
  ]);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#fff' }}>Trainings</Typography>
      <div className="ag-theme-material" style={{ height: 650, width: '100%' }}>
        <AgGridReact 
          rowData={trainings} 
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

export default TrainingList;