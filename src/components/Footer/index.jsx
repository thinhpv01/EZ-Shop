import { Badge, Box, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, CodeOutlined } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import Login2 from 'features/Auth2/components/Login';
import Register2 from 'features/Auth2/components/Register';
import { logout } from 'features/Auth2/userSlice2';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { cartItemsCountSelector } from 'features/Cart2/selectors';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'fixed',
        left: 0,
        bottom: 0,
        right: 0,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        marginLeft: '1rem',
    },
    link: {
        textDecoration: 'none',
        color: '#fff',
    },
    closeButton: {
        position: 'absolute',
        top: '.75rem',
        right: '1rem',
        zIndex: 2,
    },
}));

const MODE = {
    REGISTER: 'register',
    LOGIN: 'login',
};

export default function Footer() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [mode, setMode] = useState(MODE.LOGIN);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const loggedInUser = useSelector((state) => state.user2.current);
    const isLoggedIn = !!loggedInUser.id;
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleUserClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleUserClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutUser = () => {
        dispatch(logout());
        handleUserClose();
    };

    const handleCartClick = () => {
        history.push('/cartt');
    };

    const itemsCount = useSelector(cartItemsCountSelector);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <CodeOutlined />
                    <Typography component="h3" variant="h5" className={classes.title}>
                        <Link className={classes.link} to="/">
                            EZ Shop
                        </Link>
                    </Typography>
                    <NavLink className={classes.link} to="/albums">
                        <Button color="inherit">Album</Button>
                    </NavLink>
                    <NavLink className={classes.link} to="/todos">
                        <Button color="inherit">Todos</Button>
                    </NavLink>
                    <NavLink className={classes.link} to="/productst">
                        <Button color="inherit">Product</Button>
                    </NavLink>
                    {!isLoggedIn && (
                        <Button color="inherit" onClick={handleClickOpen}>
                            Login
                        </Button>
                    )}
                    <IconButton color="inherit" onClick={handleCartClick}>
                        <Badge badgeContent={itemsCount} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    {isLoggedIn && (
                        <IconButton color="inherit" onClick={handleUserClick}>
                            <AccountCircle />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
            <Menu
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleUserClose}
            >
                <MenuItem onClick={handleUserClose}>My account</MenuItem>
                <MenuItem onClick={handleLogoutUser}>Logout</MenuItem>
            </Menu>
            <Dialog
                open={open}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                        handleClose();
                    }
                }}
            >
                <IconButton onClick={handleClose} className={classes.closeButton}>
                    <CloseIcon />
                </IconButton>
                <DialogContent style={{ position: 'relative' }}>
                    {mode === MODE.LOGIN && (
                        <>
                            <Login2 closeDialog={handleClose} />
                            <Box textAlign="center">
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        setMode(MODE.REGISTER);
                                    }}
                                >
                                    Not Have An Account? Register Here
                                </Button>
                            </Box>
                        </>
                    )}
                    {mode === MODE.REGISTER && (
                        <>
                            <Register2 closeDialog={handleClose} />
                            <Box textAlign="center">
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        setMode(MODE.LOGIN);
                                    }}
                                >
                                    Already An Account? Register Here
                                </Button>
                            </Box>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
