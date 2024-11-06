import React from 'react';
import Box from '@mui/material/Box';
import Image from '../Assets/currencyEx.webp';
import CurrencyBox from "../Components/CurrencyBox";

const MainScreen = () => {
    return (
        <Box sx={{ height: '100vh' }}>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '40vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem',
                    textAlign: 'center',
                    overflow: 'hidden', // um sicherzustellen, dass Inhalte nicht außerhalb der Box sind
                }}
            >
                {/* Hintergrund-Box */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
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
                    <div>Convert currency</div>
                </Box>
            </Box>
            <CurrencyBox/>
        </Box>
    );
}

export default MainScreen;
