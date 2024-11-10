import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';

import { fetchAllExchangeRates, updateExchangeRate } from '../../Services/Api';
import { MessageContext } from '../../Context/MessageContext';
import {CurrencyUpdateContext} from "../../Context/CurrencyUpdateContext";
import { AuthContext } from '../../Context/AuthContext';
import { useTranslation } from 'react-i18next';

const UpdateExchangeRateButton = () => {

    const {t} = useTranslation();

    const { showMessage } = useContext(MessageContext);
    const { triggerUpdate } = useContext(CurrencyUpdateContext);
    const { isAuthenticated } = useContext(AuthContext);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [exchangeRates, setExchangeRates] = useState([]);
    const [selectedExchangeId, setSelectedExchangeId] = useState('');
    const [baseCurrency, setBaseCurrency] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('');
    const [exchangeRate, setExchangeRate] = useState('');

    // Laden der Exchange Rates für das Dropdown-Menü
    useEffect(() => {
        const loadExchangeRates = async () => {
            try {
                const response = await fetchAllExchangeRates();
                setExchangeRates(response.data);
            } catch (error) {
                showMessage(`${t("error_loading_exchange_rates")}`, 'error');
            }
        };
        loadExchangeRates();
    }, [showMessage]);

    // Öffnen und Schließen des Dialogs
    const handleDialogOpen = () => setDialogOpen(true);
    const handleDialogClose = () => {
        setDialogOpen(false);
        resetFields();
    };

    // Felder zurücksetzen
    const resetFields = () => {
        setSelectedExchangeId('');
        setBaseCurrency('');
        setTargetCurrency('');
        setExchangeRate('');
    };

    // Auswahl eines Exchange Rates und Vorausfüllen der Felder
    const handleExchangeSelect = (id) => {
        setSelectedExchangeId(id);
        const selectedExchange = exchangeRates.find(rate => rate._id === id);
        if (selectedExchange) {
            setBaseCurrency(selectedExchange.baseCurrency);
            setTargetCurrency(selectedExchange.targetCurrency);
            setExchangeRate(selectedExchange.exchangeRate);
        }
    };

    const isDuplicateExchangeRate = (base, target, id) => {
        return exchangeRates.some(
            (rate) =>
                rate.baseCurrency === base &&
                rate.targetCurrency === target &&
                rate._id !== id // Sicherstellen, dass es ein anderer Eintrag ist
        );
    };


    // Funktion zum Aktualisieren der Exchange Rate
    const handleUpdateExchangeRate = async () => {
        if (!selectedExchangeId) {
            showMessage(`${t("select_exchange_rate_to_update")}`, 'error');
            return;
        }

        const cleanedBaseCurrency = baseCurrency.trim();
        const cleanedTargetCurrency = targetCurrency.trim();

        // Duplikat-Prüfung für Base und Target Currency
        if (isDuplicateExchangeRate(cleanedBaseCurrency, cleanedTargetCurrency, selectedExchangeId)) {
            showMessage(`${t("exchange_rate_already_exists")}`, 'error');
            return;
        }

        const updatedFields = {};
        if (baseCurrency) updatedFields.baseCurrency = cleanedBaseCurrency;
        if (targetCurrency) updatedFields.targetCurrency = cleanedTargetCurrency;
        if (exchangeRate) updatedFields.exchangeRate = parseFloat(exchangeRate);

        if (Object.keys(updatedFields).length === 0) {
            showMessage(`${t("fill_one_field_to_update")}`, 'error');
            return;
        }

        try {
            await updateExchangeRate(selectedExchangeId, updatedFields);
            showMessage(`${t("exchange_rate_updated_successfully")}`, 'success');
            triggerUpdate();
            handleDialogClose();
        } catch (error) {
            const errorMessage = error.response?.data?.message || `${t("unexpected_error")}`;
            showMessage(errorMessage, 'error');
        }
    };

    // Submit on Enter key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleUpdateExchangeRate();
        }
    };

    if (!isAuthenticated) return null;
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={handleDialogOpen}
                sx={{ backgroundColor: "#063852", color: 'white', width: '350px' }}
            >
                {t("update_exchange_rate")}
            </Button>

            {/* Dialog für das Update */}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{t("update_exchange_rate")}</DialogTitle>
                <DialogContent>
                    <TextField
                        select
                        label={t("select_exchange_rate")}
                        fullWidth
                        value={selectedExchangeId}
                        onChange={(e) => handleExchangeSelect(e.target.value)}
                        margin="dense"
                    >
                        {exchangeRates
                            .slice() // Kopiere die Liste, um das Original nicht zu verändern
                            .sort((a, b) => a.baseCurrency.localeCompare(b.baseCurrency)) // Sortiere nach baseCurrency
                            .map((rate) => (
                                <MenuItem key={rate._id} value={rate._id}>
                                    {`${rate.baseCurrency} -> ${rate.targetCurrency} : ${rate.exchangeRate}`}
                                </MenuItem>
                            ))}
                    </TextField>

                    <TextField
                        label={t("base_currency")}
                        type="text"
                        fullWidth
                        margin="dense"
                        value={baseCurrency}
                        onChange={(e) => setBaseCurrency(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <TextField
                        label={t("target_currency")}
                        type="text"
                        fullWidth
                        margin="dense"
                        value={targetCurrency}
                        onChange={(e) => setTargetCurrency(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <TextField
                        label={t("exchange_rate")}
                        type="number"
                        fullWidth
                        margin="dense"
                        value={exchangeRate}
                        onChange={(e) => setExchangeRate(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button onClick={handleDialogClose} sx={{ backgroundColor: "#063852", color: 'white' }}>
                        {t("cancel")}
                    </Button>
                    <Button onClick={handleUpdateExchangeRate} sx={{ backgroundColor: "#063852", color: 'white' }}>
                        {t("update")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UpdateExchangeRateButton;
