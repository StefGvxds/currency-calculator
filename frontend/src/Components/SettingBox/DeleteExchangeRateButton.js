import React, { useState, useContext, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { deleteExchangeRate, fetchAllExchangeRates } from '../../Services/Api';
import { MessageContext } from '../../Context/MessageContext';
import { CurrencyUpdateContext } from '../../Context/CurrencyUpdateContext';

const DeleteExchangeRateButton = () => {
    const { showMessage } = useContext(MessageContext);
    const { triggerUpdate } = useContext(CurrencyUpdateContext);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [exchangeRates, setExchangeRates] = useState([]);
    const [selectedRates, setSelectedRates] = useState([]);

    const handleDialogOpen = () => setDialogOpen(true);
    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedRates([]);
    };

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await fetchAllExchangeRates();
                setExchangeRates(response.data);
            } catch (error) {
                showMessage('Error loading exchange rates.', 'error');
            }
        };
        fetchExchangeRates();
    }, [triggerUpdate, showMessage]);

    const handleDeleteExchangeRates = async () => {
        for (let id of selectedRates) {
            try {
                await deleteExchangeRate(id);
                showMessage(`Exchange rate with ID ${id} deleted successfully.`, 'success');
            } catch (error) {
                showMessage(`Error deleting exchange rate with ID ${id}.`, 'error');
                return;
            }
        }
        triggerUpdate();
        handleDialogClose();
    };

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleDialogOpen}
                sx={{ mb: 2, backgroundColor: "#d32f2f", color: 'white' }}
            >
                Delete Exchange Rate
            </Button>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Delete Exchange Rate(s)</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel>Select Exchange Rates</InputLabel>
                        <Select
                            multiple
                            value={selectedRates}
                            onChange={(e) => setSelectedRates(e.target.value)}
                            renderValue={(selected) => selected.map(id => `ID: ${id}`).join(', ')}
                        >
                            {exchangeRates.map((rate) => (
                                <MenuItem key={rate._id} value={rate._id}>
                                    {rate.baseCurrency} to {rate.targetCurrency} - {rate.exchangeRate}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} sx={{ backgroundColor: "#063852", color: 'white' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteExchangeRates} sx={{ backgroundColor: "#d32f2f", color: 'white' }}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteExchangeRateButton;
