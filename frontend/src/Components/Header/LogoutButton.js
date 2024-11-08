import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';

import { logoutUser } from '../../Services/Api';
import { AuthContext } from '../../Context/AuthContext';
import { MessageContext } from '../../Context/MessageContext';
import { useTranslation } from 'react-i18next';

const LogoutButton = ({onClose}) => {
    const { t } = useTranslation();
    const { logout } = useContext(AuthContext);
    const { showMessage } = useContext(MessageContext);

    const handleLogout = () => {
        logoutUser();
        logout();
        if (onClose) onClose();
        showMessage(`${t("logout_successful")}`,'success');
    };

    return (

        <>
            <Button onClick={handleLogout} variant="contained" sx={{ mb: 5, backgroundColor: "#063852", color: 'white' }}>
                {t("logout")}
            </Button>
        </>
    );
};

export default LogoutButton;
