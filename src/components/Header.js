import React, { useState, useContext, useEffect } from 'react';
import CustomModal from './Modal';
import './Header.css';
import { BackendContext, SessionContext } from '../context/context';
import { Link, useParams } from 'react-router-dom';
import {
	Button,
	Tabs,
	Tab,
	Box,
	TextField,
	Tooltip,
	IconButton,
	Menu,
	MenuItem,
	Avatar,
	Typography,
	ListItemIcon,
} from '@mui/material';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import jwt_decode from 'jwt-decode';
import { MdAccountCircle } from 'react-icons/md';
import { Logout, Settings } from '@mui/icons-material';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ textAlign: 'center', width: '100%' }}>
					{children}
				</Box>
			)}
		</div>
	);
}

const Header = ({ showBookShowButton }) => {
	const { baseUrl } = useContext(BackendContext);
	const {
		username,
		email,
		isAdmin,
		setState: setSession,
	} = useContext(SessionContext);
	const { id } = useParams();
	const [anchorEl, setAnchorEl] = useState(null);
	// const isLoggeIn = true;

	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const [state, setState] = useState({
		modalIsOpen: false,
		addProductModal: false,
		categories: [],
		value: 0,
		loggedIn: sessionStorage.getItem('auth-token') ? true : false,
	});

	// useEffect(() => {
	// 	console.log(state.loggedIn);
	// 	console.log(isAdmin);
	// }, [state]);

	const [login, setLogin] = useState({
		email: '',
		password: '',
	});
	const [signUp, setSignUp] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		contactNumber: '',
	});
	const [product, setProduct] = useState({
        name: '',
        price: '',
        category: '',
        imageURL: '',
        description: '',
        manufacturer: '',
        availableItems: '',
    });

    useEffect(() => {
        console.log(product);
    }, [product]);

    const openAddProductModal = () => {
        setState((ref) => ({ ...ref, addProductModal: true }));
    };
    const closeAddProductModal = () => {
        setState((ref) => ({ ...ref, addProductModal: false }));
    };

	const toggleModal = () => {
		if (state.modalIsOpen) {
			setState((ref) => ({ ...ref, modalIsOpen: false }));
		} else {
			setState((ref) => ({ ...ref, modalIsOpen: true }));
		}
	};
	const closeModal = () => {
		setState((ref) => ({ ...ref, modalIsOpen: false }));
	};

	const tabChangeHandler = (event, value) => {
		setState((ref) => ({ ...ref, value }));
	};

	const handleSignup = () => {
		console.log(signUp, JSON.stringify(signUp));
		fetch(`${baseUrl}api/v1/users`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(signUp),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setSignUp({
					firstName: '',
					lastName: '',
					email: '',
					password: '',
					contactNumber: '',
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleLogin = () => {
		fetch(`${baseUrl}api/v1/auth`, {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(login),
		})
			.then((response) => {
				const token = response.headers.get('X-Auth-Token');
				console.log(token);
				const decode = jwt_decode(token);
				console.log(decode);
				sessionStorage.setItem('auth-token', token);
				sessionStorage.setItem('uuid', decode._id);
				sessionStorage.setItem('isAdmin', decode.isAdmin);
				setSession((ref) => ({
					...ref,
					isAdmin: decode.isAdmin,
				}));
				return response.json();
			})
			.then((data) => {
				console.log(data);

				sessionStorage.setItem('name', data.name);
				sessionStorage.setItem('email', data.email);
				setState((ref) => ({ ...ref, loggedIn: true }));

				// set Cookie
				setSession((ref) => ({
					...ref,
					username: data.name,
					email: data.email,
				}));
			})
			.catch((err) => {
				console.log(err);
			});
		setLogin({ email: '', password: '' });
	};

	const handleLogout = () => {
		sessionStorage.removeItem('uuid');
		sessionStorage.removeItem('auth-token');
		sessionStorage.removeItem('email');
		sessionStorage.removeItem('name');
		sessionStorage.removeItem('isAdmin');
		sessionStorage.removeItem('cart');
		setSession({ username: '', email: '' });
		setState((ref) => ({ ...ref, loggedIn: false }));
		console.log('logged out successfully');
	};

	const handleSignupChange = (event) => {
		const { name, value } = event.target;
		setSignUp((ref) => ({ ...ref, [name]: value }));
	};

	const handleLoginChange = (event) => {
		const { name, value } = event.target;
		setLogin((ref) => ({ ...ref, [name]: value }));
	};


	const handleProductChange = (event) => {
        const { name, value } = event.target;
        setProduct((ref) => ({ ...ref, [name]: value }));
    };

    const handleAddProducts = () => {
        fetch(`${baseUrl}api/v1/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': sessionStorage.getItem('auth-token'),
            },
            body: JSON.stringify(product),
        });
    };

	return (
		<div>
			<header className="app-header">
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
				{!state.loggedIn ? (
					<div className="button-section">
						<Button
							color="primary"
							variant="contained"
							onClick={toggleModal}
						>
							Login
						</Button>
					</div>
				) : (
					<div className="button-section">
						<Box sx={{ marginLeft: '15px' }}>
							<Link to={'/cart'}>
								<ShoppingCartOutlinedIcon
									sx={{ color: 'white' }}
								/>
							</Link>
						</Box>
						<Box sx={{ marginLeft: '15px' }}>
							<Link to={'/addproducts'}>Add Products</Link>
						</Box>
						<Tooltip title="Account settings">
							<IconButton
								onClick={handleClick}
								size="large"
								sx={{ ml: 2, fontSize: '35px' }}
								aria-controls={
									open ? 'account-menu' : undefined
								}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
							>
								{/* <Avatar sx={{ width: 32, height: 32 }}> */}
								<MdAccountCircle />
								{/* </Avatar> */}
							</IconButton>
						</Tooltip>
						<Box sx={{}}>
							<Menu
								sx={{
									display: 'flex',
									flexDirection: 'column',
								}}
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
											transform:
												'translateY(-50%) rotate(45deg)',
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
												padding: 0,
												minWidth: 100,
												color: 'black',
											}}
										>
											{username}
										</Typography>
										<Typography
											sx={{
												padding: 0,
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
								{isAdmin && (
                                    <MenuItem
                                        onClick={() => {
                                            openAddProductModal();
                                            handleClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <Settings fontSize="small" />
                                        </ListItemIcon>
                                        Add Products
                                    </MenuItem>
                                )}

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
				)}
			</header>

			{/* modal of login and signup  */}
			<CustomModal isOpen={state.modalIsOpen} handleClose={closeModal}>
				<Tabs
					className="tabs"
					value={state.value}
					onChange={tabChangeHandler}
					centered
				>
					<Tab label="Login" />
					<Tab label="Register" />
				</Tabs>

				{/* login tab  */}
				<TabPanel value={state.value} index={0}>
					<Box
						sx={{
							marginBottom: '15px',
						}}
					>
						<TextField
							required
							label="Email"
							id="email"
							name={'email'}
							type="text"
							sx={{ width: '100%' }}
							email={login.email}
							onChange={handleLoginChange}
						/>
					</Box>
					<Box
						sx={{
							marginBottom: '15px',
						}}
					>
						<TextField
							required
							label="Password"
							id="password"
							name={'password'}
							type="text"
							sx={{ width: '100%' }}
							password={login.password}
							onChange={handleLoginChange}
						/>
					</Box>
					<Box>
						<Button
							variant="contained"
							onClick={() => {
								handleLogin();
								closeModal();
							}}
						>
							Login
						</Button>
					</Box>
				</TabPanel>

				{/* signup tab */}
				<TabPanel value={state.value} index={1}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-evenly',
							marginBottom: '15px',
						}}
					>
						<TextField
							required
							label="First Name"
							id="firstName"
							name="firstName"
							type="text"
							sx={{ width: '100%', marginRight: '5px' }}
							firstName={signUp.firstName}
							onChange={handleSignupChange}
						/>
						<TextField
							required
							label="Last Name"
							id="lastName"
							name={'lastName'}
							type="text"
							sx={{ width: '100%', marginLeft: '5px' }}
							lastName={signUp.lastName}
							onChange={handleSignupChange}
						/>
					</Box>

					<Box
						sx={{
							marginBottom: '15px',
						}}
					>
						<TextField
							required
							label="Email"
							id="email"
							name={'email'}
							type="text"
							sx={{ width: '100%' }}
							email={signUp.email}
							onChange={handleSignupChange}
						/>
					</Box>
					<Box
						sx={{
							marginBottom: '15px',
						}}
					>
						<TextField
							required
							id="password"
							label="password"
							type="password"
							name={'password'}
							sx={{ width: '100%' }}
							autoComplete="current-password"
							password={signUp.password}
							onChange={handleSignupChange}
						/>
					</Box>
					<Box
						sx={{
							marginBottom: '15px',
						}}
					>
						<TextField
							required
							label="Contact No."
							id="contact"
							type="text"
							sx={{ width: '100%' }}
							name={'contactNumber'}
							contact={signUp.contactNumber}
							onChange={handleSignupChange}
						/>
					</Box>
					<Box>
						<Button
							variant="contained"
							onClick={() => {
								handleSignup();
								closeModal();
							}}
						>
							Sign Up
						</Button>
					</Box>
				</TabPanel>
			</CustomModal>

			{/* modal of add products  */}
			<CustomModal
				isOpen={state.addProductModal}
				handleClose={closeAddProductModal}
			>
				<Box
					sx={{
						marginBottom: '15px',
					}}
				>
					<TextField
						required
						label="Name"
						id="name"
						name={'name'}
						type="text"
						sx={{ width: '100%' }}
						onChange={handleProductChange}
					/>
				</Box>
				<Box
					sx={{
						marginBottom: '15px',
					}}
				>
					<TextField
						required
						label="price"
						id="price"
						name={'price'}
						type="number"
						sx={{ width: '100%' }}
						price={product.price}
						onChange={handleProductChange}
					/>
				</Box>
				<Box
					sx={{
						marginBottom: '15px',
					}}
				>
					<TextField
						required
						label="Image URL"
						id="imageURL"
						name={'imageURL'}
						type="text"
						sx={{ width: '100%' }}
						imageURL={product.imageURL}
						onChange={handleProductChange}
					/>
				</Box>
				<Box
					sx={{
						marginBottom: '15px',
					}}
				>
					<TextField
						required
						label="Manufacturer"
						id="manufacturer"
						name={'manufacturer'}
						type="text"
						sx={{ width: '100%' }}
						manufacturer={product.manufacturer}
						onChange={handleProductChange}
					/>
				</Box>
				<Box
					sx={{
						marginBottom: '15px',
					}}
				>
					<TextField
						required
						label="Description"
						id="description"
						name={'description'}
						type="text"
						sx={{ width: '100%' }}
						description={product.description}
						onChange={handleProductChange}
					/>
				</Box>
				<Box
					sx={{
						marginBottom: '15px',
					}}
				>
					<TextField
						required
						label="Available Items"
						id="availableItems"
						name={'availableItems'}
						type="number"
						sx={{ width: '100%' }}
						availableItems={product.availableItems}
						onChange={handleProductChange}
					/>
				</Box>
				<Box
					sx={{
						marginBottom: '15px',
					}}
				>
					<TextField
						required
						label="Category"
						id="category"
						name={'category'}
						type="text"
						sx={{ width: '100%' }}
						category={product.category}
						onChange={handleProductChange}
					/>
				</Box>
				<Box>
					<Button
						variant="contained"
						onClick={() => {
							handleAddProducts();
							closeModal();
						}}
					>
						Add products
					</Button>
				</Box>
			</CustomModal>
		</div>
	);
};

export default Header;
