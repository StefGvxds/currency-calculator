import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { registerUser } from '../../Services/Api';
import { MessageContext } from '../../Context/MessageContext';
import { useTranslation } from 'react-i18next';

const RegisterButton = () => {

    const { showMessage } = useContext(MessageContext);
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /**
     * Handle Dialog
     */
    const handleDialogOpen = () => setOpen(true);
    const handleDialogClose = () => {
        setOpen(false);
        setUsername('');
        setPassword('');
    };

    /**
     * Handles registration, validating input and calling the API
     */
    const handleRegister = async () => {
        if (!username || !password) {
            showMessage(`${t("username_password_required")}`,'error');
            return;
        }

        try {
            await registerUser({ username, password });
            showMessage(`${t("registration_successful")}`,'success');
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

    /**
     * Allows pressing Enter to submit the registration form
     * @param e
     */
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleRegister();
        }
    };

    return (
        <>
            <Button variant="contained" onClick={handleDialogOpen} sx={{ mb: 1, backgroundColor: "#F0810F", color: '#063852' }}>
                {t("register")}
            </Button>

            {/* Dialog for registration */}
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>{t("register")}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label={t("username")}
                        type="text"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <TextField
                        margin="dense"
                        label={t("password")}
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button onClick={handleDialogClose} sx={{ mb: 1, backgroundColor: "#063852", color: 'white' }}>{t("cancel")}</Button>
                    <Button onClick={handleRegister} sx={{ mb: 1, backgroundColor: "#063852", color: 'white' }}>{t("register")}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default RegisterButton;
