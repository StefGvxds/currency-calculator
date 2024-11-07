import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { DialogContent } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import { registerUser, loginUser, deleteUser, updateUsername, updatePassword } from '../Services/Api';
import UpdateUsernameDialog from './UpdateUsernameDialog';
import UpdatePasswordDialog from './UpdatePasswordDialog';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true); // Zustand für Login/Registrieren-Modus
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const [usernameDialogOpen, setUsernameDialogOpen] = useState(false);
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
    const [token, setToken] = useState('');

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDialogOpen = (loginMode) => {
        setIsLoginMode(loginMode); // Setzt den Modus basierend auf der Schaltfläche (Login oder Create Account)
        handleClose();
        setDialogOpen(true);
        setErrorMessage('');
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setUsername('');
        setPassword('');
        setErrorMessage('');
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // Login-Handler
    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            setErrorMessage('Please fill in all fields.');
            return;
        }
        try {
            const response = await loginUser({ username, password });
            setIsLoggedIn(true);
            setToken(response.data.token); // Speichert den Token
            setCurrentUser({ id: response.data.user.id, username: response.data.user.username }); // Speichert die Benutzer-ID und den Benutzernamen
            handleDialogClose();
        } catch (error) {
            setErrorMessage('Login failed. Please try again.');
        }
    };


    // Logout-Handler
    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUser('');
        setAnchorEl(null);
    };

    // Create Account-Handler
    const handleCreateAccount = async () => {
        if (!username.trim() || !password.trim()) {
            setErrorMessage('Please fill in all fields.');
            return;
        }
        try {
            await registerUser({ username, password });
            handleDialogClose();
            setSnackbarOpen(true);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message.includes("duplicate key error")) {
                setErrorMessage('This username is already taken. Please choose another one.');
            } else {
                setErrorMessage('An error has occurred. Please try again later.');
            }
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteUser(currentUser);
            handleLogout();
            alert('Account deleted successfully.');
        } catch (error) {
            alert('An error occurred while deleting the account.');
        }
    };

    const handleUpdateUsername = async (newUsername) => {
        if (!newUsername.trim()) {
            setErrorMessage('Please enter a username.');
            return;
        }

        try {
            await updateUsername(currentUser.id, newUsername, token);
            setCurrentUser((prev) => ({ ...prev, username: newUsername })); // Aktualisiert nur den Benutzernamen im Zustand
            alert('Username updated successfully.');
        } catch (error) {
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    const handleUpdatePassword = async (newPassword) => {
        if (!newPassword.trim()) {
            setErrorMessage('Please enter a password.');
            return;
        }
        try {
            await updatePassword(currentUser.id, newPassword, token); // Übergebe den Token
            alert('Password updated successfully.');
        } catch (error) {
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    const open = Boolean(anchorEl);
    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#011A27' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {isLoggedIn ? `Welcome, ${currentUser}` : ''}
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        sx={{ ml: 'auto' }}
                        onClick={handleMenuClick}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            {isLoggedIn ? (
                                <>
                                    <Button onClick={handleDeleteAccount} color="black" sx={{ mb: 1, backgroundColor: "red" }}>
                                        Delete Account
                                    </Button>
                                    <Button onClick={() => setUsernameDialogOpen(true)} sx={{ mb: 1, backgroundColor: "#063852", color: 'white' }}>
                                        Change Username
                                    </Button>
                                    <Button onClick={() => setPasswordDialogOpen(true)} sx={{ mb: 1, backgroundColor: "#063852", color: 'white' }}>
                                        Change Password
                                    </Button>
                                    <Button onClick={handleLogout} sx={{ mb: 1, backgroundColor: "#063852", color: 'white' }}>
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="contained" onClick={() => handleDialogOpen(true)} sx={{ mb: 1, backgroundColor: "#063852" }}>
                                        Login
                                    </Button>
                                    <Button variant="outlined" color="primary" onClick={() => handleDialogOpen(false)}>
                                        Create Account
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Popover>

                    {/* Dialog für Username ändern */}
                    <UpdateUsernameDialog
                        isOpen={usernameDialogOpen}
                        onClose={() => setUsernameDialogOpen(false)}
                        onUpdate={handleUpdateUsername}
                    />

                    {/* Dialog für Passwort ändern */}
                    <UpdatePasswordDialog
                        isOpen={passwordDialogOpen}
                        onClose={() => setPasswordDialogOpen(false)}
                        onUpdate={handleUpdatePassword}
                    />
                </Toolbar>
            </AppBar>

            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{isLoginMode ? "Login" : "Create Account"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorMessage && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {errorMessage}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={isLoginMode ? handleLogin : handleCreateAccount} color="primary" variant="contained">
                        {isLoginMode ? "Login" : "Create Account"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message="Account successfully created!"
            />
        </>
    );

}

export default Header;
