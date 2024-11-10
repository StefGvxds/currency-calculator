import React, { useState, useContext, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    InputLabel,
    FormControl
} from '@mui/material';

import { deleteExchangeRate, fetchAllExchangeRates } from '../../Services/Api';
import { AuthContext } from '../../Context/AuthContext';
import { MessageContext } from '../../Context/MessageContext';
import { CurrencyUpdateContext } from '../../Context/CurrencyUpdateContext';
import { useTranslation } from 'react-i18next';

const DeleteExchangeRateButton = () => {
    const { t } = useTranslation();
    const { isAuthenticated } = useContext(AuthContext);
    const { showMessage } = useContext(MessageContext);
    const { triggerUpdate } = useContext(CurrencyUpdateContext);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [exchangeRates, setExchangeRates] = useState([]);
    const [selectedRates, setSelectedRates] = useState([]);

    const handleDeleteDialogOpen = () => setDeleteDialogOpen(true);
    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setSelectedRates([]);
    };

    // Fetch all exchange rates to populate the dropdown
    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await fetchAllExchangeRates();
                setExchangeRates(response.data);
            } catch (error) {
                showMessage(`${t("error_loading_exchange_rates")}`, 'error');
            }
        };
        fetchExchangeRates();
    }, [triggerUpdate, showMessage]);


    // Delete selected exchange rates one by one
    const handleDeleteExchangeRates = async () => {
        for (let id of selectedRates) {
            try {
                await deleteExchangeRate(id);
                showMessage(`${t("exchange_rate_deleted_1")} + ${id} + ${t("exchange_rate_deleted_2")}`, 'success');
            } catch (error) {
                showMessage(`${t("error_deleting_exchange_rate")} ${id}.`, 'error');
                return;
            }
        }
        triggerUpdate();
        handleDeleteDialogClose();
    };

    if (!isAuthenticated) return null;
    return(
        <>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleDeleteDialogOpen}
                sx={{ backgroundColor: "#d32f2f", color: 'white', width: '350px'}}
            >
                {t("delete_exchange_rate")}
            </Button>
            {/* Dialog for deleting exchange rates */}
            <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
                <DialogTitle>{t("delete_exchange_rate_plural")}</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel>{t("select_exchange_rate")}</InputLabel>
                        <Select
                            multiple
                            value={selectedRates}
                            onChange={(e) => setSelectedRates(e.target.value)}
                            renderValue={(selected) => selected.map(id => `ID: ${id}`).join(', ')}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 400, // Begrenze die Höhe des Dropdown-Menüs
                                        overflowY: 'auto',
                                    },
                                },
                                getContentAnchorEl: null, // Verhindert das Andocken des Dropdowns
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                },
                                transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'left',
                                },
                            }}
                        >
                            {exchangeRates
                                .slice() // Erstelle eine Kopie der Liste, um das Original nicht zu verändern
                                .sort((a, b) => a.baseCurrency.localeCompare(b.baseCurrency)) // Sortiere alphabetisch nach baseCurrency
                                .map((rate) => (
                                    <MenuItem key={rate._id} value={rate._id}>
                                        {`${rate.baseCurrency} to ${rate.targetCurrency} - ${rate.exchangeRate}`}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>

                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button onClick={handleDeleteDialogClose} sx={{ backgroundColor: "#063852", color: 'white' }}>
                        {t("cancel")}
                    </Button>
                    <Button onClick={handleDeleteExchangeRates} sx={{ backgroundColor: "#d32f2f", color: 'white' }}>
                        {t("delete")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteExchangeRateButton;