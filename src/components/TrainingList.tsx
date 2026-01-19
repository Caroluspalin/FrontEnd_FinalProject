import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';
import { Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Training, Customer } from '../types';
import { ColDef, ICellRendererParams } from 'ag-grid-community';

const TrainingList: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);

  const fetchTrainings = async () => {
    try {
      const res = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings');
      const data = await res.json();
      
      const raw: Training[] = data._embedded.trainings;
      
      const enriched = await Promise.all(raw.map(async (t) => {
        const cRes = await fetch(t._links.customer.href);
        const cData: Customer = await cRes.json();
        return { ...t, customerName: `${cData.firstname} ${cData.lastname}` };
      }));
      setTrainings(enriched);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTrainings(); }, []);

  const deleteTraining = (url: string) => {
    if (window.confirm("Delete training?")) {
      fetch(url, { method: 'DELETE' }).then(() => fetchTrainings());
    }
  };

  const [columnDefs] = useState<ColDef<Training>[]>([
    { field: 'date', valueFormatter: (p) => dayjs(p.value).format('DD.MM.YYYY HH:mm'), filter: true, sortable: true, flex: 1.2 },
    { field: 'activity', filter: true, sortable: true, flex: 1.2 },
    { field: 'duration', headerName: 'Min', filter: true, sortable: true, flex: 0.8 },
    { field: 'customerName', headerName: 'Customer', filter: true, sortable: true, flex: 1.5 },
    {
      headerName: 'Actions', width: 100, pinned: 'right',
      cellRenderer: (p: ICellRendererParams) => (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <IconButton color="error" size="small" onClick={() => deleteTraining(p.data._links.self.href)}><DeleteIcon /></IconButton>
        </Box>
      )
    }
  ]);

  return (
    <Box>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 3, 
          fontWeight: 'bold', 
          color: '#fff',
          textShadow: '0 0 15px rgba(99, 102, 241, 0.6), 0 0 30px rgba(99, 102, 241, 0.4)',
          letterSpacing: '1px'
        }}
      >
        Trainings
      </Typography>
      <div className="ag-theme-material" style={{ height: 600, width: '100%' }}>
        <AgGridReact rowData={trainings} columnDefs={columnDefs} pagination={true} paginationPageSize={50} autoSizeStrategy={{ type: 'fitGridWidth' }} />
      </div>
    </Box>
  );
};

export default TrainingList