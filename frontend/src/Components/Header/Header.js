import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import RegisterButton from './RegisterButton';
import ChangeUsernameButton from './ChangeUsernameButton';
import DeleteAccountButton from "./DeleteAccountButton";
import { AuthContext } from '../../Context/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "../LanguageSwitcher";

const Header = props => {

    const { t } = useTranslation();

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
    const { isAuthenticated, username } = useContext(AuthContext);

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#011A27' }}>
            <Toolbar>
                {isAuthenticated ? (
                    <Typography variant="h6">{t('welcome')}, {username}</Typography>
                ) : null}
                <Box sx={{ ml: '20px' }} edge="start">
                    <LanguageSwitcher />
                </Box>

                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    sx={{ml: 'auto'}}
                    onClick={handleClick}
                >
                    <MenuIcon/>
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
                    <Box sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        {isAuthenticated ? (
                            <>
                                <ChangeUsernameButton onClose={handleClose}/>
                                <LogoutButton onClose={handleClose}/>
                                <DeleteAccountButton onClose={handleClose}/>
                            </>
                        ) : (
                            <>
                                <LoginButton onClose={handleClose}/>
                                <RegisterButton onClose={handleClose}/>
                            </>
                        )}
                    </Box>
                </Popover>
            </Toolbar>
        </AppBar>
    );
}

export default Header;

