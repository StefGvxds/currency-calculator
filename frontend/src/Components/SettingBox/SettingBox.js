import React, { useState, useContext, useEffect } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl
} from '@mui/material';

import { addExchangeRate, deleteExchangeRate, fetchAllExchangeRates } from '../../Services/Api';
import { AuthContext } from '../../Context/AuthContext';
import { MessageContext } from '../../Context/MessageContext';
import { CurrencyUpdateContext } from '../../Context/CurrencyUpdateContext';

const SettingBox = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const { showMessage } = useContext(MessageContext);
    const { triggerUpdate } = useContext(CurrencyUpdateContext);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [baseCurrency, setBaseCurrency] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('');
    const [exchangeRate, setExchangeRate] = useState('');
    const [exchangeRates, setExchangeRates] = useState([]);
    const [selectedRates, setSelectedRates] = useState([]);

    // Open and close dialogs
    const handleDialogOpen = () => setDialogOpen(true);
    const handleDialogClose = () => {
        setDialogOpen(false);
        setBaseCurrency('');
        setTargetCurrency('');
        setExchangeRate('');
    };

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
                showMessage('Error loading exchange rates.', 'error');
            }
        };
        fetchExchangeRates();
    }, [triggerUpdate, showMessage]);

    // Submit the new exchange rate
    const handleAddExchangeRate = async () => {
        if (!baseCurrency || !targetCurrency || !exchangeRate) {
            showMessage('All fields are required.', 'error');
            return;
        }

        try {
            await addExchangeRate({ baseCurrency, targetCurrency, exchangeRate: parseFloat(exchangeRate) });
            showMessage('Exchange rate added successfully!', 'success');
            triggerUpdate();
            handleDialogClose();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            showMessage(errorMessage, 'error');
        }
    };

    // Delete selected exchange rates one by one
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
        handleDeleteDialogClose();
    };

    // Submit on Enter key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddExchangeRate();
        }
    };

    // Render component only if authenticated
    if (!isAuthenticated) return null;

    return (
        <Box
            sx={{
                height: {
                    xs: '11vh',
                    sm: '11vh',
                    md: '11vh'
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
                    textAlign: 'center',
                    width: '78%',
                    height: 'auto',
                    padding: 2
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDialogOpen}
                    sx={{ mb: 2, backgroundColor: "#063852", color: 'white' }}
                >
                    Add New Exchange Rate
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDeleteDialogOpen}
                    sx={{ mb: 2, backgroundColor: "#d32f2f", color: 'white' }}
                >
                    Delete Exchange Rate
                </Button>

                {/* Dialog for adding a new exchange rate */}
                <Dialog open={dialogOpen} onClose={handleDialogClose}>
                    <DialogTitle>Add New Exchange Rate</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Base Currency"
                            type="text"
                            fullWidth
                            value={baseCurrency}
                            onChange={(e) => setBaseCurrency(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <TextField
                            margin="dense"
                            label="Target Currency"
                            type="text"
                            fullWidth
                            value={targetCurrency}
                            onChange={(e) => setTargetCurrency(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <TextField
                            margin="dense"
                            label="Exchange Rate"
                            type="number"
                            fullWidth
                            value={exchangeRate}
                            onChange={(e) => setExchangeRate(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} sx={{ backgroundColor: "#063852", color: 'white' }}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddExchangeRate} sx={{ backgroundColor: "#063852", color: 'white' }}>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Dialog for deleting exchange rates */}
                <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
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
                        <Button onClick={handleDeleteDialogClose} sx={{ backgroundColor: "#063852", color: 'white' }}>
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteExchangeRates} sx={{ backgroundColor: "#d32f2f", color: 'white' }}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default SettingBox;
