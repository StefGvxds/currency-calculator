import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';

import { logoutUser } from '../../Services/Api';
import { AuthContext } from '../../Context/AuthContext';
import { MessageContext } from '../../Context/MessageContext';

const LogoutButton = ({onClose}) => {
    const { logout } = useContext(AuthContext);
    const { showMessage } = useContext(MessageContext);

    const handleLogout = () => {
        logoutUser();
        logout();
        if (onClose) onClose();
        showMessage('You have successfully logged out.','success');
    };

    return (

        <>
            <Button onClick={handleLogout} variant="contained" sx={{ mb: 5, backgroundColor: "#063852", color: 'white' }}>
                Logout
            </Button>
        </>
    );
};

export default LogoutButton;
