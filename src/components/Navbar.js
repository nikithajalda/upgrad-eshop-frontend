import React, { Component, useContext, useEffect, useState } from 'react';
import './Navbar.css';
import {
	Avatar,
	Box,
	Button,
	Divider,
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	Modal,
	Tooltip,
	Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { IoCartSharp } from 'react-icons/io5';
import { MdAccountCircle } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { Settings, Logout } from '@mui/icons-material/';
import { SessionContext } from '../context/context';
const Navbar = () => {
	const { username, email, setState } = useContext(SessionContext);

	const [anchorEl, setAnchorEl] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	// const isLoggeIn = true;
	useEffect(() => {
		if (username && email) {
			setIsLoggedIn(true);
		}
	}, [username, email]);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		sessionStorage.removeItem('uuid');
		sessionStorage.removeItem('name');
		sessionStorage.removeItem('isAdmin');
		setState({ username: 'Guest', email: '' });
	};


	const handleLoginOpen = () => {
		// setIsLoggedIn(!isLoggedIn);
	};

	return (
		<nav className="navbar-container">
			<div className="logo-menu-container ">
				<div className="logo">

					<IconContext.Provider
						value={{
							className: 'global-class-name icon-style',
							size: '1em',
						}}
					>
						<Link to={'/'}>
							<RiShoppingBag3Fill />
							uG-Eshop
						</Link>
					</IconContext.Provider>

				</div>
			</div>
			<div className="btn-container">
				{!isLoggedIn && (
					<Link to="/login">
						<Button
							variant="contained"
							className="button"
							// onClick={handleLoginOpen}
						>
							Login
						</Button>
					</Link>
				)}

				{isLoggedIn && (
					<Tooltip title="Account settings">
						<IconButton
							onClick={handleClick}
							size="large"
							sx={{ ml: 2, fontSize: '35px' }}
							aria-controls={open ? 'account-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
						>
							{/* <Avatar sx={{ width: 32, height: 32 }}> */}
							<MdAccountCircle />
							{/* </Avatar> */}
						</IconButton>
					</Tooltip>
				)}
				{/* )} */}
				<Box sx={{}}>
					<Menu
						sx={{ display: 'flex', flexDirection: 'column' }}
						anchorEl={anchorEl}
						id="account-menu"
						open={open}
						onClose={handleClose}
						onClick={handleClose}
						PaperProps={{
							elevation: 0,
							sx: {
								overflow: 'visible',
								filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
								mt: 1.5,
								'& .MuiAvatar-root': {
									width: 32,
									height: 32,
									ml: -0.5,
									mr: 1,
								},
								'&:before': {
									content: '""',
									display: 'block',
									position: 'absolute',
									top: 0,
									right: 14,
									width: 10,
									height: 10,
									bgcolor: 'background.paper',
									transform: 'translateY(-50%) rotate(45deg)',
									zIndex: 0,
								},
							},
						}}
						transformOrigin={{
							horizontal: 'right',
							vertical: 'top',
						}}
						anchorOrigin={{
							horizontal: 'right',
							vertical: 'bottom',
						}}
					>
						<MenuItem
							onClick={handleClose}
							sx={{ display: 'flex' }}
						>
							<Avatar />
							<div>
								<Typography
									sx={{
										minWidth: 100,
										color: 'black',
									}}
								>
									{username}
								</Typography>
								<Typography
									sx={{
										fontSize: '.70em',
										color: 'grey',
										minWidth: 100,
									}}
								>
									{email}
								</Typography>
							</div>
						</MenuItem>

						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<Settings fontSize="small" />
							</ListItemIcon>
							Settings
						</MenuItem>

						<MenuItem
							onClick={() => {
								handleLogout();
								handleClose();
							}}
						>
							<ListItemIcon>
								<Logout fontSize="small" />
							</ListItemIcon>
							Logout
						</MenuItem>
					</Menu>
				</Box>
			</div>
		</nav>
	);
};
export default Navbar;
