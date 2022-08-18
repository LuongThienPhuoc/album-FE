import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Outlet, NavLink } from "react-router-dom";
import "./TheContent.scss"
import { userLogOut } from '../../actions/userAction';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const TheContent = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogoutUser = () => {
        dispatch(userLogOut())
        navigate('/login')
    }

    return (
        <>
            <AppBar sx={{ background: '#F6CB18' }} position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <NavLink className="nav-link-icon" to={'/my-album'}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    width: '150px',
                                    height: '30px'
                                }}
                            >
                                <img src='/logo.png'></img>
                            </Typography>
                        </NavLink>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <Typography fontWeight={600} textAlign="center">
                                    <NavLink className="nav-link-icon-mobile" to={'/my-album'}>My Album</NavLink>
                                </Typography>
                                <Typography fontWeight={600} textAlign="center">
                                    <NavLink className="nav-link-icon-mobile" to={'/upload'}>Upload</NavLink>
                                </Typography>
                            </Menu>
                        </Box>
                        <NavLink className="nav-link-icon" to={'/my-album'}>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href=""
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    width: '150px',
                                    height: '30px'
                                }}
                            >
                                <Typography textAlign="center">
                                    <img style={{ width: '120px' }} src='logo.png'></img>
                                </Typography>
                            </Typography>
                        </NavLink>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Typography fontWeight={600} textAlign="center">
                                <NavLink className="nav-link-icon" to={'/my-album'}>My Album</NavLink>
                            </Typography>
                            <Typography fontWeight={600} textAlign="center">
                                <NavLink className="nav-link-icon" to={'/upload'}>Upload</NavLink>
                            </Typography>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontalogoutl: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography onClick={handleLogoutUser} textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet></Outlet>
        </>
    );
};
export default TheContent;
