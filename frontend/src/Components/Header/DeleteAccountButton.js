import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { deleteUser } from '../../Services/Api';
import { AuthContext } from '../../Context/AuthContext';
import { MessageContext } from '../../Context/MessageContext';
import { useTranslation } from 'react-i18next';

const DeleteAccountButton = ({ onClose }) => {
    const { t } = useTranslation();
    const { userId, logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const { showMessage } = useContext(MessageContext);

    /**
     * Functions to open and close the confirmation dialog
     */
    const handleDialogOpen = () => setOpen(true);
    const handleDialogClose = () => {
        setOpen(false);
        if (onClose) onClose();
    };

    /**
     * unction to handle account deletion, including API call and user feedback
     * @returns {Promise<void>}
     */
    const handleDeleteAccount = async () => {
        try {
            await deleteUser(userId);
            showMessage(`${t("account_deleted_successfully")}`, 'success');
            handleDialogClose();
            logout();
        } catch (error) {
            const errorMessage = error.response?.data?.message || `${t("unexpected_error")}`;
            showMessage(errorMessage, 'error');
        }
    };

    /**
     * Handle Enter key to submit the account deletion directly from confirmation dialog
     * @param e
     */
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleDeleteAccount();
        }
    };

    return (
        <>
            <Button variant="contained" onClick={handleDialogOpen} sx={{ mb: 1, backgroundColor: "darkred", color: 'white' }}>
                {t("delete_account")}
            </Button>

            {/* Dialog for account deletion confirmation */}
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>{t("confirm_account_deletion")}</DialogTitle>
                <DialogContent>
                    {t("confirm_delete_message")}
                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button onClick={handleDialogClose} sx={{ mb: 1, backgroundColor: "#063852", color: 'white' }}>{t("cancel")}</Button>
                    <Button onClick={handleDeleteAccount} sx={{ mb: 1, backgroundColor: "darkred", color: 'white' }} onKeyDown={handleKeyDown}>
                        {t("confirm_delete")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteAccountButton;
