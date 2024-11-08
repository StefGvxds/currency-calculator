import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { updatePassword } from '../../Services/Api';
import { AuthContext } from '../../Context/AuthContext';
import { MessageContext } from '../../Context/MessageContext';

const ChangePasswordButton = ({ onClose }) => {
    const { userId } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { showMessage } = useContext(MessageContext);

    const handleDialogOpen = () => setOpen(true);
    const handleDialogClose = () => {
        setOpen(false);
        setNewPassword('');
        setConfirmPassword('');
        if (onClose) onClose();
    };

    const handleUpdatePassword = async () => {
        if (!newPassword || !confirmPassword) {
            showMessage('Both password fields are required', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            showMessage('Passwords do not match', 'error');
            return;
        }

        try {
            await updatePassword(userId, newPassword);
            console.log(newPassword);
            console.log(userId);
            showMessage('Password updated successfully!', 'success');
            handleDialogClose();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            showMessage(errorMessage, 'error');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleUpdatePassword();
        }
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleDialogOpen} sx={{ mb: 1 }}>
                Change Password
            </Button>

            {/* Dialog for changing password */}
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="New Password"
                        type="password"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <TextField
                        margin="dense"
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} sx={{ mb: 1, backgroundColor: "#063852", color: 'white' }}>Cancel</Button>
                    <Button onClick={handleUpdatePassword} sx={{ mb: 1, backgroundColor: "#063852", color: 'white' }}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ChangePasswordButton;
