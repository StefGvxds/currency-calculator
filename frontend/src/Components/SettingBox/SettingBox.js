import React, { useState, useContext, useEffect } from 'react';
import {Box, Typography} from '@mui/material';

import AddExchangeRateButton from './AddExchangeRateButton';
import DeleteExchangeRateButton from './DeleteExchangeRateButton';
import UpdateExchangeRateButton from './UpdateExchangeRateButton';
import {AuthContext} from "../../Context/AuthContext";
import { useTranslation } from 'react-i18next';

const SettingBox = () => {
    const { t } = useTranslation();
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Box
            sx={{
                height: {
                    xs: '18vh',
                    sm: '11vh',
                    md: '11vh'
                }
            }}
        >
            {isAuthenticated ? (
                <Box
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 2,
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                        textAlign: 'center',
                        width: '78%',
                        height: 'auto',
                        padding: 2,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                        gap: 2,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <AddExchangeRateButton/>
                    <UpdateExchangeRateButton/>
                    <DeleteExchangeRateButton/>
                </Box>
            ) : (
              <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="h5" >{t("login_required_for_changes")}</Typography>
              </Box>
            )}
        </Box>
    );
};

export default SettingBox;
