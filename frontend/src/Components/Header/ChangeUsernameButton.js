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
import { useTranslation } from 'react-i18next';

const ChangeUsernameButton = ({ onClose }) => {
    const { t } = useTranslation();
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
            showMessage(`${t("username_empty")}`, 'error');
            return;
        }

        try {
            await updateUsername(userId, newUsername); // userId für die Anfrage verwenden
            setUsername(newUsername); // AuthContext aktualisieren
            showMessage(`${t("username_updated")}`, 'success');
            handleDialogClose();
        } catch (error) {
            let errorMessage;

            if (error.response?.data?.message?.includes('E11000 duplicate key error')) {
                errorMessage = `${t("username_exists")}`;
            } else {
                errorMessage = error.response?.data?.message || `${t("unexpected_error")}`;
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
                {t("change_username")}
            </Button>

            {/* Dialog for changing username */}
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>{t("change_username")}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label={t("new_username")}
                        type="text"
                        fullWidth
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button onClick={handleDialogClose} sx={{ mb: 1, backgroundColor: "#063852", color: 'white' }}>{t("cancel")}</Button>
                    <Button onClick={handleUpdateUsername} sx={{ mb: 1, backgroundColor: "#063852", color: 'white' }}>{t("save")}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ChangeUsernameButton;
