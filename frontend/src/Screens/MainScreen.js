import React from 'react';
import {Stack, Box, Typography} from '@mui/material';
import Image from '../Assets/currencyEx.webp';


import SettingBox from "../Components/SettingBox/SettingBox";
import CurrencyBox from "../Components/CurrencyBox";


const MainScreen = () => {
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
                {/* Hintergrund-Box */}
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
                        filter: 'brightness(0.5)', // verdunkelt das Bild ein wenig
                    }}
                />
                {/* Halbtransparente Overlay-Box */}
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
                {/* Text auf dem Hintergrund */}
                <Box sx={{ position: 'relative' }}>
                    <Typography variant="h3">Convert currency</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default MainScreen;
