import mongoose from 'mongoose';

// Define schema for currency exchange rates
const currencySchema = new mongoose.Schema({
    baseCurrency: { type: String, required: true },
    targetCurrency: { type: String, required: true },
    exchangeRate: { type: Number, required: true }
});

export default mongoose.model('Currency', currencySchema);