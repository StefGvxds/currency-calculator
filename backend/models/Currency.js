import mongoose from 'mongoose';

/**
 * Define the schema for currency exchange rates
 */
const currencySchema = new mongoose.Schema({
    // The base currency for the exchange rate, stored as a string (e.g., "USD")
    baseCurrency: { type: String, required: true },
    // The target currency for the exchange rate, also stored as a string (e.g., "EUR")
    targetCurrency: { type: String, required: true },
    // The exchange rate from baseCurrency to targetCurrency, stored as a number (e.g., 1.23)
    exchangeRate: { type: Number, required: true }
});

// Create and export the 'Currency' model based on the currencySchema
// This model represents the 'currencies' collection in MongoDB and provides an interface to interact with it
export default mongoose.model('Currency', currencySchema);