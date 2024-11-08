import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { deleteUser } from '../../Services/Api';
import { AuthContext } from '../../Context/AuthContext';
import { MessageContext } from '../../Context/MessageContext';

const DeleteAccountButton = ({ onClose }) => {
    const { userId, logout } = useContext(AuthContext); // userId und logout aus AuthContext
    const [open, setOpen] = useState(false);
    const { showMessage } = useContext(MessageContext);

    const handleDialogOpen = () => setOpen(true);
    const handleDialogClose = () => {
        setOpen(false);
        if (onClose) onClose(); // Schließt Popover nach dem Dialog schließen
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteUser(userId);
            showMessage('Account deleted successfully!', 'success');
            handleDialogClose();
            logout(); // Benutzer ausloggen nach Löschung des Kontos
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            showMessage(errorMessage, 'error');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleDeleteAccount();
        }
    };

    return (
        <>
            <Button variant="contained" onClick={handleDialogOpen} sx={{ mb: 1, backgroundColor: "darkred", color: 'white' }}>
                Delete Account
            </Button>

            {/* Dialog for account deletion confirmation */}
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Confirm Account Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete your account? This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} sx={{ mb: 1, backgroundColor: "#063852", color: 'white' }}>Cancel</Button>
                    <Button onClick={handleDeleteAccount} sx={{ mb: 1, backgroundColor: "darkred", color: 'white' }} onKeyDown={handleKeyDown}>
                        Confirm Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteAccountButton;
