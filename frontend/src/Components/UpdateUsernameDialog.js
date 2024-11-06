import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { DialogContent } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const UpdateUsernameDialog = ({ isOpen, onClose, onUpdate }) => {
    const [newUsername, setNewUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUpdate = () => {
        if (!newUsername.trim()) {
            setErrorMessage('Please enter a username.');
            return;
        }
        onUpdate(newUsername);
        setNewUsername(''); // Reset the input after updating
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Change Username</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="New Username"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
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
                    Update Username
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateUsernameDialog;
