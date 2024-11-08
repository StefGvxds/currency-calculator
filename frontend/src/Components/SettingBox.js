import React, { useState, useContext } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

import { addExchangeRate } from '../Services/Api';
import { AuthContext } from '../Context/AuthContext';
import { MessageContext } from '../Context/MessageContext';
import { CurrencyUpdateContext } from '../Context/CurrencyUpdateContext';

const SettingBox = () => {
    const { isAuthenticated } = useContext(AuthContext); // Check if user is authenticated
    const { showMessage } = useContext(MessageContext);
    const { triggerUpdate } = useContext(CurrencyUpdateContext);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [baseCurrency, setBaseCurrency] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('');
    const [exchangeRate, setExchangeRate] = useState('');

    // Open and close dialog
    const handleDialogOpen = () => setDialogOpen(true);
    const handleDialogClose = () => {
        setDialogOpen(false);
        setBaseCurrency('');
        setTargetCurrency('');
        setExchangeRate('');
    };

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
                    xs: '12vh',
                    sm: '12vh',
                    md: '14vh'
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
            </Box>
        </Box>

    );
};

export default SettingBox;
