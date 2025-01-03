import React, { useState, useContext } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';

import { addExchangeRate, fetchAllExchangeRates } from '../../Services/Api';
import { AuthContext } from '../../Context/AuthContext';
import { MessageContext } from '../../Context/MessageContext';
import { CurrencyUpdateContext } from '../../Context/CurrencyUpdateContext';
import { useTranslation } from 'react-i18next';

const AddExchangeRateButton = () => {
    const { t } = useTranslation();
    const { isAuthenticated } = useContext(AuthContext);
    const { showMessage } = useContext(MessageContext);
    const { triggerUpdate } = useContext(CurrencyUpdateContext);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [baseCurrency, setBaseCurrency] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('');
    const [exchangeRate, setExchangeRate] = useState('');
    const [existingRates, setExistingRates] = useState([]);

    /**
     * Fetches existing exchange rates from the server
     * @returns {Promise<void>}
     */
    const fetchExistingExchangeRates = async () => {
        try {
            const response = await fetchAllExchangeRates();
            setExistingRates(response.data);
        } catch (error) {
            showMessage(`${t("error_loading_exchange_rates")}`, 'error');
        }
    };

    /**
     * Handle Dialog
     * @returns {Promise<void>}
     */
    const handleDialogOpen = async () => {
        setDialogOpen(true);
        await fetchExistingExchangeRates();
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setBaseCurrency('');
        setTargetCurrency('');
        setExchangeRate('');
    };

    /**
     * Checks if a duplicate exchange rate exists
     * @param base
     * @param target
     * @returns {boolean}
     */
    const isDuplicateRate = (base, target) => {
        return existingRates.some(
            (rate) =>
                rate.baseCurrency === base && rate.targetCurrency === target
        );
    };


    /**
     * Handles adding a new exchange rate, including validation and API call
     * @returns {Promise<void>}
     */
    const handleAddExchangeRate = async () => {

        const cleanedBaseCurrency = baseCurrency.trim();
        const cleanedTargetCurrency = targetCurrency.trim();

        if (!baseCurrency || !targetCurrency || !exchangeRate) {
            showMessage(`${t("all_fields_required")}`, 'error');
            return;
        } else if (isDuplicateRate(cleanedBaseCurrency, cleanedTargetCurrency)) {
            showMessage(`${t("exchange_rate_already_exists")}`, 'error');
            return;
        }

        try {
            await addExchangeRate({ baseCurrency: cleanedBaseCurrency, targetCurrency: cleanedTargetCurrency, exchangeRate: parseFloat(exchangeRate) });
            showMessage(`${t("exchange_rate_added")}`, 'success');
            triggerUpdate();
            handleDialogClose();
        } catch (error) {
            const errorMessage = error.response?.data?.message || `${t("unexpected_error")}`;
            showMessage(errorMessage, 'error');
        }
    };

    /**
     * Allows pressing Enter to submit the form
     * @param e
     */
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddExchangeRate();
        }
    };

    /**
     * Render nothing if the user is not authenticated
     */
    if (!isAuthenticated) return null;

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={handleDialogOpen}
                sx={{ backgroundColor: "#063852", color: 'white', width: '350px' }}
            >
                {t("add_new_exchange_rate")}
            </Button>
            {/* Dialog for adding a new exchange rate */}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{t("add_new_exchange_rate")}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label={t("base_currency")}
                        type="text"
                        fullWidth
                        value={baseCurrency}
                        onChange={(e) => setBaseCurrency(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <TextField
                        margin="dense"
                        label={t("target_currency")}
                        type="text"
                        fullWidth
                        value={targetCurrency}
                        onChange={(e) => setTargetCurrency(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <TextField
                        margin="dense"
                        label={t("exchange_rate")}
                        type="number"
                        fullWidth
                        value={exchangeRate}
                        onChange={(e) => setExchangeRate(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button onClick={handleDialogClose} sx={{ backgroundColor: "#063852", color: 'white' }}>
                        {t("cancel")}
                    </Button>
                    <Button onClick={handleAddExchangeRate} sx={{ backgroundColor: "#063852", color: 'white' }}>
                        {t("submit")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddExchangeRateButton;