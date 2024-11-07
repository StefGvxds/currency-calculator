import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';

import { logoutUser } from '../../Services/Api';
import { AuthContext } from '../../Context/AuthContext';

const LogoutButton = ({onClose}) => {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logoutUser();
        logout();
        if (onClose) onClose();
    };

    return (

        <>
            <Button onClick={handleLogout} color="primary" variant="contained">
                Logout
            </Button>
        </>
    );
};

export default LogoutButton;
