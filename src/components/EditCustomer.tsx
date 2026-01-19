import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Customer } from '../types';

const EditCustomer: React.FC<{ customer: Customer, updateCustomer: () => void }> = ({ customer, updateCustomer }) => {
  const [open, setOpen] = useState(false);
  const [edited, setEdited] = useState<Customer>(customer);

  const handleSave = () => {
    fetch(customer._links.customer.href, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(edited)
    }).then(() => { setOpen(false); updateCustomer(); });
  };

  return (
    <>
      <IconButton color="primary" size="small" onClick={() => setOpen(true)}><EditIcon /></IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField label="Firstname" value={edited.firstname} fullWidth variant="standard" onChange={e => setEdited({...edited, firstname: e.target.value})} />
          <TextField label="Lastname" value={edited.lastname} fullWidth variant="standard" onChange={e => setEdited({...edited, lastname: e.target.value})} />
          <TextField label="Email" value={edited.email} fullWidth variant="standard" onChange={e => setEdited({...edited, email: e.target.value})} />
          <TextField label="Phone" value={edited.phone} fullWidth variant="standard" onChange={e => setEdited({...edited, phone: e.target.value})} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} sx={{ background: '#6366f1' }}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditCustomer;