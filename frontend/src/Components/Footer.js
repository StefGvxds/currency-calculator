import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                px: 3,
                mt: 'auto',
                backgroundColor: '#F0810F', // oder ein anderer Farbton
                textAlign: 'center',
                borderTop: '1px solid #ddd',
            }}
        >
            <Typography variant="h6" color="textSecondary">
                {'© '}
                {new Date().getFullYear()} {' '}
                Stefanos Gavouchidis -{' '}
                <Link color="inherit" href="https://gavouchidis.com" target="_blank" rel="noopener noreferrer">
                    Visit my Portfolio
                </Link>
            </Typography>
        </Box>
    );
}

export default Footer;
