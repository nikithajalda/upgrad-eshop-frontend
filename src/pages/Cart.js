
import React, { useContext, useEffect, useState } from 'react';
import './Cart.css';
import { BackendContext } from '../context/context';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import CustomModal from '../components/Modal';

const Cart = () => {
	const { baseUrl } = useContext(BackendContext);
	const [cart, setCart] = useState({
		cartItems: JSON.parse(sessionStorage.getItem('cart')) || [],
	});
	const [items, setItems] = useState([]);
	const [state, setState] = useState({
		isAddressModalOpen: false,
	});

	useEffect(() => {
		return () => {
			cart.cartItems.map((el) => {
				fetch(`${baseUrl}api/v1/products/${el.id}`, {})
					.then((response) => response.json())
					.then((data) => {
						// console.log('data = ', data);
						setItems((ref) => [...ref, data]);
					})
					.catch((error) => console.log(error));
			});
		};
	}, []);

	useEffect(() => {
		console.log('items = ', items);
	}, [items]);

	const [addresses, setAddresses] = useState([
		{
			name: '',
			contactNumber: '',
			city: '',
			landmark: '',
			street: '',
			state: '',
			zipCode: '',
		},
	]);

	const [formData, setFormData] = useState({
		name: '',
		contactNumber: '',
		city: '',
		landmark: '',
		street: '',
		state: '',
		zipCode: '',
	});

	useEffect(() => {
		console.log(addresses);
	}, [addresses]);

	useEffect(() => {
		const auth_token = sessionStorage.getItem('auth-token');
		fetch(`${baseUrl}api/v1/addresses`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': auth_token, // Replace with your actual authentication token
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				// Handle the response data
				setAddresses(data);
				console.log(data);
			})
			.catch((error) => {
				// Handle any errors
				console.error('Error:', error);
			});
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const calculateTotalPrice = () => {
		const response = items.map((el) => el.price);
		const total = response.reduce((a, b) => a + b, 0);
		return total;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const auth_token = sessionStorage.getItem('auth-token');

		fetch(`${baseUrl}api/v1/addresses`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': auth_token, // Replace with your actual authentication token
			},
			body: JSON.stringify(formData),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				// Handle the response data
				console.log(data);
			})
			.catch((error) => {
				// Handle any errors
				console.error('Error:', error);
			});

		// Reset form fields
		setFormData({
			name: '',
			contactNumber: '',
			city: '',
			landmark: '',
			street: '',
			state: '',
			zipCode: '',
		});
	};

	const toggleModal = () => {
		if (state.isAddressModalOpen) {
			setState((ref) => ({ ...ref, isAddressModalOpen: false }));
		} else {
			setState((ref) => ({ ...ref, isAddressModalOpen: true }));
		}
	};
	const closeModal = () => {
		setState((ref) => ({ ...ref, isAddressModalOpen: false }));
	};
	return (
		<div className="cart-container">
			<div className="cart-items-section">
				<div className="cart-items-container">
					{items?.map((el) => {
						return (
							<div className={'cart-items'}>
								<div className="cart-img">
									<img
										src={el.imageURL}
										alt={'alternate image'}
										className="img"
									/>
								</div>
								<div className="cart-data">
									<div className="cart-data-namePrice">
										<Typography
											sx={{
												padding: '0',
												textAlign: 'left',
											}}
										>
											{el.name}
										</Typography>

										{/* <Typography
											sx={{
												padding: '0',
												textAlign: 'left',
											}}
										>
											{el.price} Rs
										</Typography> */}
									</div>
									<Typography
										sx={{ padding: '0', textAlign: 'left' }}
									>
										{el.description}
									</Typography>
									<Typography
										sx={{ padding: '0', textAlign: 'left' }}
									>
										From - {el.manufacturer}
									</Typography>
									<Typography
										sx={{ padding: '0', textAlign: 'left' }}
									>
										Price - {el.price}
									</Typography>
								</div>
							</div>
						);
					})}
				</div>

				<div>
					<div className="cart-checkout-section">
						<div className="checkout-data">
							<Typography>
								Total : {calculateTotalPrice()}
							</Typography>
						</div>
						<Button
							sx={{ width: '100%' }}
							color={'primary'}
							variant={'contained'}
						>
							checkout
						</Button>
					</div>
					<div className="cart-checkout-section">
						<div className="checkout-data">
							<Button
								color="primary"
								variant="contained"
								onClick={toggleModal}
							>
								Add Address
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div>
				{addresses.length
					? addresses?.map((el, elXid) => {
							return (
								<Box
									sx={{
										borderRadius: '5px',
										border: '1px solid black',
									}}
								>
									<div>{el.street}</div>
									<div>
										{el.city} - {el.state}
									</div>
								</Box>
							);
					  })
					: null}
			</div>
			<CustomModal
				isOpen={state.isAddressModalOpen}
				handleClose={closeModal}
				className="Modal"
			>
				<h1 className="cart-title">Cart</h1>
				<form onSubmit={handleSubmit}>
					<Box className="form-group"
					 sx={{display:"flex",
					 justifyContent:"space-evenly"}}>
						
						<TextField
							className="input"
							label="Name"
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							required
						/>
					
					
						<TextField
							className="input"
							label="Contact Number"
							type="text"
							id="contactNumber"
							name="contactNumber"
							value={formData.contactNumber}
							onChange={handleInputChange}
							required
						/>
					</Box>
					<Box className="form-group"
					  sx={{display:"flex",
					  justifyContent:"space-evenly",}}>
						<TextField
							className="input"
							label="City"
							type="text"
							id="city"
							name="city"
							value={formData.city}
							onChange={handleInputChange}
							required
						/>
					
						<TextField
							className="input"
							label="Landmark"
							type="text"
							id="landmark"
							name="landmark"
							value={formData.landmark}
							onChange={handleInputChange}
						/>
					</Box>
					<FormControl fullWidth>
						<TextField sx={{width:"100%",marginBottom:"5px"}}
							className="input"
							label="Street"
							type="text"
							id="street"
							name="street"
							value={formData.street}
							onChange={handleInputChange}
							required
						/>
					</FormControl>
					<Box className="form-group"
					  sx={{display:"flex",
					  justifyContent:"space-evenly"}}>
						<TextField
							className="input"
							label="State"
							type="text"
							id="state"
							name="state"
							value={formData.state}
							onChange={handleInputChange}
							required
						/>
					
						<TextField
							className="input"
							label="Zip Code"
							type="text"
							id="zipCode"
							name="zipCode"
							value={formData.zipCode}
							onChange={handleInputChange}
							required
						/>
					</Box>
					<Button
						className="button"
						type="submit"
						variant="contained"
						color="primary"
					>
						Submit
					</Button>
				</form>
			</CustomModal>
		</div>

	);
};

export default Cart;
