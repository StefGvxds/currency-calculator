import React, { createContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const MessageContext = createContext();

/**
 * Provider component to manage and provide message notifications
 * @param children
 * @returns {Element}
 * @constructor
 */
const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState('info');
    const [open, setOpen] = useState(false);

    /**
     * Function to display a message with a specified severity level
     * @param msg
     * @param severity
     */
    const showMessage = (msg, severity = 'info') => {
        setMessage(msg);
        setSeverity(severity);
        setOpen(true);
    };

    /**
     * Function to close the Snackbar
     */
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <MessageContext.Provider value={{ showMessage }}>
            {children}
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} variant="filled">
                    {message}
                </Alert>
            </Snackbar>
        </MessageContext.Provider>
    );
};

export default MessageProvider;

/**
 * Usage
 *
 * import { MessageContext } from '../../Context/MessageContext';
 *
 * const { showMessage } = useContext(MessageContext);
 *
 * showMessage('Error occurred!', 'error');     // red
 * showMessage('Note on input.', 'warning');  // yellow
 * showMessage('Further information.', 'info');   // blue
 * showMessage('Action successful!', 'success');   // green
 */
