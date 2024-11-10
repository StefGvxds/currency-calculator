import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';

/**
 * Footer component to display a footer section with copyright and link to portfolio
 * @returns {Element}
 * @constructor
 */
const Footer = () => {

    const { t } = useTranslation();

    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                px: 3,
                mt: 'auto',
                backgroundColor: '#F0810F',
                textAlign: 'center',
                borderTop: '1px solid #ddd',
            }}
        >
            <Typography variant="h6" color="textSecondary">
                {'© '}
                {new Date().getFullYear()} {' '}
                Stefanos Gavouchidis -{' '}
                <Link color="inherit" href="https://gavouchidis.com" target="_blank" rel="noopener noreferrer">
                    {t("visit_portfolio")}
                </Link>
            </Typography>
        </Box>
    );
}

export default Footer;
