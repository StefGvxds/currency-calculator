import express from 'express';
import Currency from '../models/Currency.js';
const router = express.Router();
import protect from '../middleware/authMiddleware.js';

// Create a new exchange rate
// Only authenticated users can access this function >protect<
router.post('/currency', protect, async (req, res) => {
    try {
        const newCurrency = new Currency(req.body);
        const savedCurrency = await newCurrency.save();
        res.status(201).json(savedCurrency);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all exchange rates
router.get('/currency', async (req, res) => {
    try {
        const currencies = await Currency.find();
        res.json(currencies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an exchange rate by ID
// Only authenticated users can access this function >protect<
router.put('/currency/:id', protect, async (req, res) => {
    try {
        const updatedCurrency = await Currency.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedCurrency);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an exchange rate by ID
// Only authenticated users can access this function >protect<
router.delete('/currency/:id', protect, async (req, res) => {
    try {
        await Currency.findByIdAndDelete(req.params.id);
        res.json({ message: 'Currency exchange rate deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Currency conversion endpoint
router.post('/convert', async (req, res) => {
    const { baseCurrency, targetCurrency, amount } = req.body;

    try {
        // Find the exchange rate in MongoDB
        const rateData = await Currency.findOne({ baseCurrency, targetCurrency });

        if (rateData) {
            // Calculate the converted amount
            const convertedAmount = amount * rateData.exchangeRate;
            res.json({ baseCurrency, targetCurrency, amount, convertedAmount });
        } else {
            res.status(404).json({ message: 'Exchange rate not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/convert-reverse', async (req, res) => {
    const { baseCurrency, targetCurrency, amount } = req.body;

    try {
        // Find the exchange rates in both directions
        const directRate = await Currency.findOne({ baseCurrency, targetCurrency });
        const reverseRate = await Currency.findOne({ baseCurrency: targetCurrency, targetCurrency: baseCurrency });

        if (directRate && reverseRate) {
            // Both directions are available, so calculate the converted amount
            const convertedAmount = amount * reverseRate.exchangeRate;
            res.json({
                baseCurrency: targetCurrency,  // Swap the currencies
                targetCurrency: baseCurrency,
                amount,
                convertedAmount
            });
        } else {
            res.status(404).json({ message: 'Bidirectional exchange rate not available' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
