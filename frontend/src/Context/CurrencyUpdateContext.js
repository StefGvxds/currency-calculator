import React, { createContext, useState, useCallback } from 'react';

/**
 * Create a new context for currency updates
 * @type {React.Context<unknown>}
 */
export const CurrencyUpdateContext = createContext();

/**
 * Provider component to manage and provide currency update functionality to the application
 * @param children
 * @returns {Element}
 * @constructor
 */
const CurrencyUpdateProvider = ({ children }) => {
    const [updateTrigger, setUpdateTrigger] = useState(false);

    const triggerUpdate = useCallback(() => {
        setUpdateTrigger(prev => !prev);
    }, []);

    return (
        <CurrencyUpdateContext.Provider value={{ updateTrigger, triggerUpdate }}>
            {children}
        </CurrencyUpdateContext.Provider>
    );
};

export default CurrencyUpdateProvider;
