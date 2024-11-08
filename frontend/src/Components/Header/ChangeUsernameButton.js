import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { updateUsername } from '../../Services/Api';
import { AuthContext } from '../../Context/AuthContext';
import { MessageContext } from '../../Context/MessageContext';

const ChangeUsernameButton = ({ onClose }) => {
    const { userId, setUsername } = useContext(AuthContext); // userId und setUsername aus AuthContext
    const [open, setOpen] = useState(false);
    const [newUsername, setNewUsername] = useState('');

    const { showMessage } = useContext(MessageContext);

    const handleDialogOpen = () => setOpen(true);
    const handleDialogClose = () => {
        setOpen(false);
        if (onClose) onClose(); // Schließt Popover nach dem Dialog schließen
    };

    const handleUpdateUsername = async () => {
        if (!newUsername) {
            showMessage('Username cannot be empty', 'error');
            return;
        }

        try {
            await updateUsername(userId, newUsername); // userId für die Anfrage verwenden
            setUsername(newUsername); // AuthContext aktualisieren
            showMessage('Username updated successfully!', 'success');
            handleDialogClose();
        } catch (error) {
            let errorMessage;

            if (error.response?.data?.message?.includes('E11000 duplicate key error')) {
                errorMessage = 'Username already exists. Please choose another one.';
            } else {
                errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            }
            showMessage(errorMessage, 'error');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleUpdateUsername();
        }
    };

    return (
        <>
            <Button variant="contained" onClick={handleDialogOpen} sx={{ mb: 1, backgroundColor: "#063852", color: 'white' }}>
                Change Username
            </Button>

            {/* Dialog for changing username */}
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Change Username</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="New Username"
                        type="text"
                        fullWidth
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} sx={{ mb: 1, backgroundColor: "#063852", color: 'white' }}>Cancel</Button>
                    <Button onClick={handleUpdateUsername} sx={{ mb: 1, backgroundColor: "#063852", color: 'white' }}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ChangeUsernameButton;
