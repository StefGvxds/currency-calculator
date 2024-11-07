import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { DialogContent } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const UpdatePasswordDialog = ({ isOpen, onClose, onUpdate }) => {
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUpdate = () => {
        if (!newPassword.trim()) {
            setErrorMessage('Please enter a password.');
            return;
        }
        onUpdate(newPassword);
        setNewPassword(''); // Reset the input after updating
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="New Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                {errorMessage && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {errorMessage}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleUpdate} color="primary" variant="contained">
                    Update Password
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdatePasswordDialog;
