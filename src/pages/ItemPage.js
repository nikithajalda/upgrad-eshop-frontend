import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './itempage.css';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { IconContext } from 'react-icons';

import { BsHeart } from 'react-icons/bs';
import { BackendContext } from '../context/context';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

// "id": 1,
// "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
// "price": 109.95,
// "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
// "category": "men's clothing",
// "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
// "rating": {
// "rate": 3.9,
// "count": 120
// }

const ItemPage = () => {
	const { baseUrl } = useContext(BackendContext);
	const { id } = useParams();

	const [state, setState] = useState({});
	const [cart, setCart] = useState({
		cartItems: [],
		existingProduct: false,
		productCount: 0,
	});

	useEffect(() => {
		fetch(`${baseUrl}api/v1/products/${id}`, {})
			.then((response) => response.json())
			.then((data) => {
				// console.log(data);
				setState(data);
			})
			.catch((error) => console.log(error));
		const cartSession = JSON.parse(sessionStorage.getItem('cart')) || [];
		setCart({
			cartItems: cartSession,
			productCount:
				cartSession?.find((el) => el.id === id)?.productCount || 0,
			existingProduct: cartSession?.find((el) => el.id === id)
				? true
				: false,
		});
	}, []);

	const handleAddToCart = () => {
		const isPresent = cart.cartItems?.find((el) => el.id === id);
		if (isPresent) {
			const cartItemsRef = cart.cartItems.map((el) => {
				if (el.id === id) {
					el.productCount += 1;
				}
				return el;
			});
			const prodCount = cart.cartItems.filter(
				(el) => el.id === id,
			).length;
			setCart((ref) => ({
				...ref,
				cartItems: cartItemsRef,
				productCount: prodCount,
				existingProduct: true,
			}));
			sessionStorage.setItem('cart', JSON.stringify(cartItemsRef));
		} else {
			sessionStorage.setItem(
				'cart',
				JSON.stringify([
					...cart.cartItems,
					{ id: id, productCount: 1 },
				]),
			);
			setCart((ref) => ({
				...ref,
				productCount: 1,
				existingProduct: true,
				cartItems: [...ref.cartItems, { id: id, productCount: 1 }],
			}));
		}
	};

	const handleRemoveExistingProduct = () => {
		const cartItemsRef = cart.cartItems.map((el) => {
			if (el.id === id) {
				if (el.productCount > 0) {
					el.productCount -= 1;
				}
			}
			return el;
		});
		const prodCount = cart.cartItems.find(
			(el) => el.id === id,
		).productCount;
		setCart((ref) => ({
			...ref,
			cartItems: cartItemsRef,
			productCount: prodCount,
			existingProduct: prodCount > 0 ? true : false,
		}));
		sessionStorage.setItem('cart', JSON.stringify(cartItemsRef));
	};

	const handleAddExistingProduct = () => {
		const cartItemsRef = cart.cartItems.map((el) => {
			if (el.id === id) {
				el.productCount += 1;
			}
			return el;
		});
		const prodCount = cart.cartItems.find(
			(el) => el.id === id,
		).productCount;
		setCart((ref) => ({
			...ref,
			cartItems: cartItemsRef,
			productCount: prodCount,
			existingProduct: true,
		}));
		sessionStorage.setItem('cart', JSON.stringify(cartItemsRef));
	};

	return (
        
		<div className="productCard card flex-grow flex flex-col">
			<div className="flex justify-center flex-wrap datas-start my-12">
				<div className="imageCont rounded-md m-3 flex flex-col datas-end">
					<IconContext.Provider
						value={{
							color: 'white',
							size: '.5em',
							className: 'global-class-name flex flex-end',
						}}
					>
						<BsHeart />
					</IconContext.Provider>
					<img
						className="aspect-square"
						src={state.imageURL}
						alt={'Unsupported image.'}
						height="200"
						width="200"
					/>
				</div>
				<div className="flex ml-24 px-6 py-2 max-w-lg w-full">
					<div className=" p-2">
						<h3 className="text-3xl font-fjalla">{state.name}</h3>
						<h3 className="text-lg font-fjalla">
							{state.description}
						</h3>
					</div>
					<div className="flex">
						
						<h3 className="uppercase text-3xl pb-4">
							specifications
						</h3>
						</div>
						<div className="grid grid-cols-3 gap-4">
							<div className="">
								<h3 className="text-lg font-fjalla text-terbg">
									Category - {state.category}
								</h3>
								{/* <h2 className="text-lg font-fjalla">
									{state.category}
								</h2> */}
							</div>
							<div className="">
								<h3 className="text-lg font-fjalla text-terbg">
									manufacturer - {state.manufacturer}
								</h3>
								{/* <h2 className="text-lg font-fjalla">
									{state.manufacturer}
								</h2> */}
							</div>
							<div className="">
								<h3 className="text-lg font-fjalla text-terbg">
									Available Items - {state.availableItems}
								</h3>
							</div>
						</div>
					{/* </div> */}
					<div className="flex ">
						<h3>Price - {state.price}</h3>
					</div>
					<br />
					<div className="flex ">
						{cart.existingProduct ? (
							<Box sx={{ display: 'flex', alignItem: 'center' }}>
								<Button
									sx={{ margin: '10px' }}
									color="primary"
									variant="contained"
									onClick={handleRemoveExistingProduct}
								>
									<RemoveIcon />
								</Button>
								<Typography sx={{ margin: '0px 10px' }}>
									{cart.productCount}
								</Typography>
								<Button
									sx={{ margin: '10px' }}
									color="primary"
									variant="contained"
									onClick={handleAddExistingProduct}
								>
									<AddIcon />
								</Button>
							</Box>
						) : (
							<Link to={`/cart`}>
							<Button
								sx={{ margin: '10px' }}
								variant="contained"
								onClick={handleAddToCart}>
								Add To Cart
							</Button>
							</Link>	
						)}
						<Button sx={{ margin: '10px' }} variant="contained">
							Buy Now
						</Button>

					</div>
				</div>
			</div>
		</div>
	);
};

export default ItemPage;
