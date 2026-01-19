import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Tooltip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Customer } from '../types';

const AddTraining: React.FC<{ customer: Customer }> = ({ customer }) => {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({ activity: '', duration: 0, date: dayjs() as Dayjs | null });

  const handleSave = () => {
    const newTraining = { 
      ...training, 
      date: training.date?.toISOString(), 
      customer: customer._links.self.href 
    };
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newTraining)
    }).then(() => setOpen(false));
  };

  return (
    <>
      <Tooltip title="Add Training"><IconButton color="primary" size="small" onClick={() => setOpen(true)}><AddCircleIcon /></IconButton></Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New Training for {customer.firstname}</DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Activity" fullWidth variant="standard" onChange={e => setTraining({...training, activity: e.target.value})} />
          <TextField label="Duration (min)" type="number" fullWidth variant="standard" onChange={e => setTraining({...training, duration: Number(e.target.value)})} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker label="Date and Time" value={training.date} onChange={(val) => setTraining({...training, date: val})} />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}><Button onClick={() => setOpen(false)}>Cancel</Button><Button variant="contained" onClick={handleSave} sx={{ background: '#6366f1' }}>Save</Button></DialogActions>
      </Dialog>
    </>
  );
};

export default AddTraining;