import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { TextField, Typography, MenuItem, Button } from "@mui/material";

import { fetchAllExchangeRates, convertCurrency, convertCurrencyReverse } from '../Services/Api';
import { MessageContext } from '../Context/MessageContext';
import { useTranslation } from 'react-i18next';

const CurrencyBox = () => {
    const { t } = useTranslation();
    const { showMessage } = useContext(MessageContext);
    const [amount, setAmount] = useState("");
    const [baseCurrency, setBaseCurrency] = useState("");
    const [targetCurrency, setTargetCurrency] = useState("");
    const [exchangeRates, setExchangeRates] = useState([]);
    const [targetCurrencies, setTargetCurrencies] = useState([]);
    const [conversionResult, setConversionResult] = useState(null);

    /**
     * Fetches all exchange rates from the server when the component mounts
     */
    useEffect(() => {
        const loadExchangeRates = async () => {
            try {
                const response = await fetchAllExchangeRates();
                setExchangeRates(response.data);
            } catch (error) {
                showMessage(`${t("error_loading_exchange_rates")}`, "error");
            }
        };
        loadExchangeRates();
    }, [showMessage]);

    /**
     * Generates a list of unique base currencies from fetched exchange rates
     * @type {*[]}
     */
    const uniqueBaseCurrencies = exchangeRates
        .map(rate => rate.baseCurrency)
        .filter((currency, index, self) => self.indexOf(currency) === index);

    /**
     * Updates the list of possible target currencies when a base currency is selected
     */
    useEffect(() => {
        if (baseCurrency) {
            const filteredRates = exchangeRates
                .filter(rate => rate.baseCurrency === baseCurrency)
                .map(rate => rate.targetCurrency);
            setTargetCurrencies(filteredRates);
        } else {
            setTargetCurrencies([]);
        }
    }, [baseCurrency, exchangeRates]);

    /**
     * Switches base and target currencies and performs a reverse conversion
     * @returns {Promise<void>}
     */
    const handleSwitchCurrencies = async () => {
        if (!amount || !baseCurrency || !targetCurrency) {
            showMessage(`${t("complete_all_fields_before_switching")}`, "error");
            return;
        }

        try {
            const response = await convertCurrencyReverse({ baseCurrency, targetCurrency, amount });
            setConversionResult(response.data.convertedAmount);
            setBaseCurrency(targetCurrency);
            setTargetCurrency(baseCurrency);
        } catch (error) {
            showMessage(`${t("error_reversing_currency_conversion")}`, "error");
        }
    };

    /**
     * Handles currency conversion based on selected base and target currencies and amount
     * @returns {Promise<void>}
     */
    const handleConvert = async () => {
        if (!amount || !baseCurrency || !targetCurrency) {
            showMessage(`${t("complete_all_fields_before_converting")}`, "error");
            return;
        }

        try {
            const response = await convertCurrency({ baseCurrency, targetCurrency, amount });
            setConversionResult(response.data.convertedAmount);
        } catch (error) {
            showMessage(`${t("error_converting_currency")}`, "error");
        }
    };

    return (
        <Box
            sx={{
                height: {
                    xs: '46vh',
                    sm: '52vh',
                    md: '22vh'
                }
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
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                    width: '78%',
                    height: 'auto',
                    padding: 2,
                    marginTop: 4
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        gap: 2,
                        justifyContent: 'center'
                    }}
                >
                    <TextField
                        label={t("amount")}
                        type="number"
                        variant="outlined"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        sx={{ width: { xs: '100%', md: '20%' } }}
                    />
                    <TextField
                        label={t("base_currency")}
                        select
                        variant="outlined"
                        value={baseCurrency}
                        onChange={(e) => setBaseCurrency(e.target.value)}
                        sx={{ width: { xs: '100%', md: '20%' } }}
                    >
                        {uniqueBaseCurrencies
                            .slice()
                            .sort((a, b) => a.localeCompare(b))
                            .map((currency, index) => (
                                <MenuItem key={index} value={currency}>
                                    {currency}
                                </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        variant="outlined"
                        onClick={handleSwitchCurrencies}
                        sx={{ minWidth: { xs: '100%', md: 50 } }}
                    >
                        ⇄
                    </Button>
                    <TextField
                        label={t("target_currency")}
                        select
                        variant="outlined"
                        value={targetCurrency}
                        onChange={(e) => setTargetCurrency(e.target.value)}
                        sx={{ width: { xs: '100%', md: '20%' } }}
                        disabled={!baseCurrency}
                    >
                        {targetCurrencies
                            .slice()
                            .sort((a, b) => a.localeCompare(b))
                            .map((currency, index) => (
                                <MenuItem key={index} value={currency}>
                                    {currency}
                                </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        variant="contained"
                        onClick={handleConvert}
                        sx={{
                            backgroundColor: "#063852",
                            color: 'white',
                            width: { xs: '100%', md: 'auto' }
                        }}
                    >
                        {t("convert")}
                    </Button>
                </Box>

                {conversionResult && (
                    <Box mt={3} sx={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography variant="h5">
                            {t("conversion_result")}: {Number(conversionResult).toFixed(4)}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default CurrencyBox;
