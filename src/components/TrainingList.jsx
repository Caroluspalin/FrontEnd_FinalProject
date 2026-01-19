import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';

function TrainingList() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      // 1. Haetaan kaikki treenit
      const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings');
      const data = await response.json();
      const rawTrainings = data._embedded.trainings;

      // 2. Haetaan asiakastiedot jokaiselle treenille (Grade 5 logiikka)
      const trainingsWithCustomers = await Promise.all(
        rawTrainings.map(async (training) => {
          const customerRes = await fetch(training._links.customer.href);
          const customerData = await customerRes.json();
          return {
            ...training,
            customerName: `${customerData.firstname} ${customerData.lastname}`
          };
        })
      );

      setTrainings(trainingsWithCustomers);
    } catch (err) {
      console.error("Virhe tiedon haussa:", err);
    }
  };

  const [columnDefs] = useState([
    { 
      headerName: 'Date', 
      field: 'date', 
      filter: true, 
      sortable: true,
      valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY HH:mm')
    },
    { field: 'duration', headerName: 'Duration (min)', filter: true, sortable: true },
    { field: 'activity', filter: true, sortable: true },
    { 
      headerName: 'Customer', 
      field: 'customerName', // Käytetään uutta yhdistettyä kenttää
      filter: true, 
      sortable: true 
    },
  ]);

  return (
    <div className="ag-theme-material" style={{ height: 600, width: '100%' }}>
      <Typography variant="h4" sx={{ my: 2 }}>Trainings</Typography>
      <AgGridReact 
        rowData={trainings} 
        columnDefs={columnDefs} 
        pagination={true} 
        paginationPageSize={10} 
      />
    </div>
  );
}

export default TrainingList;