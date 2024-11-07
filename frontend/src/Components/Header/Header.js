import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { AuthContext } from '../../Context/AuthContext';

const Header = props => {
    /**
     * Manage the Popover
     */
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    /**
     *  Manage Login (username)
     */
    const { isAuthenticated, username, logout } = useContext(AuthContext);

    return (
        <AppBar position="static" sx={{ backgroundColor: '#011A27' }}>
            <Toolbar>
                {isAuthenticated ? (
                    <Typography variant="h6">Welcome, {username}</Typography>
                ) : null }
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    sx={{ ml: 'auto' }}
                    onClick={handleClick}
                >
                    <MenuIcon />
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        {isAuthenticated ? (
                            <LogoutButton onClose={handleClose} />
                        ) : (
                            <LoginButton onClose={handleClose} />
                        )}
                    </Box>
                </Popover>
            </Toolbar>
        </AppBar>
    );
}

export default Header;

