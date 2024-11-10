import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";

import { fetchAllExchangeRates } from '../Services/Api';
import { CurrencyUpdateContext } from '../Context/CurrencyUpdateContext';
import { useTranslation } from 'react-i18next';

/**
 * Component to display all available exchange rates in a table
 * @returns {Element}
 * @constructor
 */
const ShowAllCurrBox = () => {
    const {t} = useTranslation();
    const [exchangeRates, setExchangeRates] = useState([]);
    const [loading, setLoading] = useState(true);

    const { updateTrigger } = useContext(CurrencyUpdateContext);

    /**
     * Fetch exchange rates when the component mounts or when updateTrigger changes
     */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchAllExchangeRates();
                const sortedData = response.data.sort((a, b) => a.baseCurrency.localeCompare(b.baseCurrency));
                setExchangeRates(sortedData);
            } catch (error) {
                console.error("Error fetching exchange rates:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [updateTrigger]);

    return (

        <Box
            sx={{
                height: {
                    xs: '60vh',
                    sm: '60vh',
                    md: '60vh'
                },
                width: '100%'
            }}
        >

            <Box
                sx={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    textAlign: 'center',
                    justifyContent: 'center',
                    width: {
                        xs: '83%',
                        sm: '81%',
                        md: '80%'
                    },
                    height: '50%',
                    padding: '16px',
                    overflow: 'auto',
                }}
            >
                <TableContainer
                    component={Paper}
                    sx={{borderRadius: '12px',}}
                >
                    <Table aria-label="currency exchange rates">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        {t("base_currency")}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        {t("target_currency")}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        {t("exchange_rate")}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : exchangeRates.length > 0 ? (
                                exchangeRates.map((rate, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">{rate.baseCurrency}</TableCell>
                                        <TableCell align="center">{rate.targetCurrency}</TableCell>
                                        <TableCell align="center">{rate.exchangeRate}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        {t("no_exchange_rates_available")}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>

    );
};

export default ShowAllCurrBox;
