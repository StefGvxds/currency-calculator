import React from 'react';
import {Stack, Box, Typography} from '@mui/material';
import Image from '../Assets/currencyEx.webp';
import { useTranslation } from 'react-i18next';

/**
 * MainScreen component displaying a header with background image and overlay text
 * @returns {Element}
 * @constructor
 */
const MainScreen = () => {

    const { t } = useTranslation();

    return (
        <Box sx={{ height: '30vh' }}>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '30vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem',
                    textAlign: 'center',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '30vh',
                        backgroundImage: `url(${Image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(0.5)',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#0638524D',
                    }}
                />
                <Box sx={{ position: 'relative' }}>
                    <Typography variant="h3">{t("convert_currency")}</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default MainScreen;
