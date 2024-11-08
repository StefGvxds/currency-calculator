import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { loginUser } from '../../Services/Api';
import { AuthContext } from '../../Context/AuthContext';
import { MessageContext } from '../../Context/MessageContext';

const LoginButton = ({onClose}) => {
    const { showMessage } = useContext(MessageContext);
    const { login } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleDialogOpen = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);

    const handleLogin = async () => {
        if (!username || !password) {
            showMessage('Username and Password are required.','error');
            return;
        }

        try {
            const response = await loginUser({ username, password });
            const { token, userId } = response.data;
            login(username, token, userId);
            if (onClose) onClose();
            showMessage('Login successful!','success');
            handleDialogClose();
        } catch (error) {
            showMessage('Login failed. Please check your credentials.','error');
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
        </>
    );
};

export default LoginButton;
