// src/Context/CurrencyUpdateContext.js

import React, { createContext, useState, useCallback } from 'react';

// Erstelle den CurrencyUpdateContext
export const CurrencyUpdateContext = createContext();

const CurrencyUpdateProvider = ({ children }) => {
    const [updateTrigger, setUpdateTrigger] = useState(false);

    // Funktion, um den Status umzuschalten und damit ein Update auszulösen
    const triggerUpdate = useCallback(() => {
        setUpdateTrigger(prev => !prev); // Toggeln des Status, um neu zu rendern
    }, []);

    return (
        <CurrencyUpdateContext.Provider value={{ updateTrigger, triggerUpdate }}>
            {children}
        </CurrencyUpdateContext.Provider>
    );
};

export default CurrencyUpdateProvider;
