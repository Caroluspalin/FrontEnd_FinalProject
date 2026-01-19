import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Customer } from '../types';

const AddCustomer: React.FC<{ saveCustomer: () => void }> = ({ saveCustomer }) => {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<Partial<Customer>>({});

  const handleSave = () => {
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(customer)
    }).then(() => { setOpen(false); setCustomer({}); saveCustomer(); });
  };

  return (
    <div>
      <Button 
        variant="outlined" 
        startIcon={<AddIcon />} 
        onClick={() => setOpen(true)} 
        sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', borderRadius: '12px' }}
      >
        New Customer
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          {/* MUI v6 Grid: Ei 'item'-propsia, käytetään 'size' */}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 6 }}>
                <TextField label="First Name" fullWidth variant="standard" onChange={e => setCustomer({...customer, firstname: e.target.value})} />
            </Grid>
            <Grid size={{ xs: 6 }}>
                <TextField label="Last Name" fullWidth variant="standard" onChange={e => setCustomer({...customer, lastname: e.target.value})} />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <TextField label="Email" fullWidth variant="standard" onChange={e => setCustomer({...customer, email: e.target.value})} />
            </Grid>
            <Grid size={{ xs: 6 }}>
                <TextField label="Phone" fullWidth variant="standard" onChange={e => setCustomer({...customer, phone: e.target.value})} />
            </Grid>
            <Grid size={{ xs: 6 }}>
                <TextField label="City" fullWidth variant="standard" onChange={e => setCustomer({...customer, city: e.target.value})} />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <TextField label="Address" fullWidth variant="standard" onChange={e => setCustomer({...customer, streetaddress: e.target.value})} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ color: 'rgba(255,255,255,0.6)' }}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} sx={{ background: '#6366f1' }}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCustomer;