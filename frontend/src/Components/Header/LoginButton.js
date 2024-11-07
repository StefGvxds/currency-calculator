import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';

import { loginUser } from '../../Services/Api';
import { AuthContext } from '../../Context/AuthContext';

const LoginButton = ({onClose}) => {
    const { login } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleDialogOpen = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);
    const handleSnackbarClose = () => setSnackbarOpen(false);

    const handleLogin = async () => {
        if (!username || !password) {
            setSnackbarMessage('Username and Password are required.');
            setSnackbarOpen(true);
            return;
        }

        try {
            const response = await loginUser({ username, password });
            const { token } = response.data;
            login(username, token);
            if (onClose) onClose();
            handleDialogClose();
        } catch (error) {
            setSnackbarMessage('Login failed. Please check your credentials.');
            setSnackbarOpen(true);
        }
    };

    // Check for Enter key and trigger login
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <>
            <Button variant="contained" onClick={handleDialogOpen} sx={{ mb: 1, backgroundColor: "#063852", color: 'white' }}>
                Login
            </Button>

            {/* Dialog for login */}
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Username"
                        type="text"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} sx={{ mb: 1, backgroundColor: "#063852", color: 'white' }}>Cancel</Button>
                    <Button onClick={handleLogin} sx={{ mb: 1, backgroundColor: "#063852", color: 'white' }}>Login</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for feedback */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </>
    );
};

export default LoginButton;
