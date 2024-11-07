import react from 'react';
import Box from "@mui/material/Box";
import React from "react";

const CurrencyBox = props => {
    return  (
    <Box
        sx={{
            position: 'absolute',
            top: '35vh', // Positioniert die Box teilweise in der oberen Hälfte
            left: '50%',
            transform: 'translateX(-50%)', // Horizontale Zentrierung
            zIndex: 2, // Über dem Hintergrund und Overlay
            backgroundColor: 'white', // Weißer Hintergrund für die Box
            borderRadius: '12px', // Abgerundete Ecken
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // Schattierung unter der Box
            textAlign: 'center', // Zentrierter Text
            width: '85%',
            height: '25%'
        }}
    >
        <div>Hello</div>
        <div>You</div>
    </Box>
    );
}

export default CurrencyBox;