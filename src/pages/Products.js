import React, { useContext, useEffect, useState } from 'react';
import './Products.css';
import { BackendContext } from '../context/context';
import { categories } from '../lib/index';
import {
	Box,
	Button,
	ButtonGroup,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { BiSearchAlt } from 'react-icons/bi';
const Products = () => {
	const [state, setState] = useState({
		categories: [],
		products: [],
	});

	const [filter, setFilter] = useState({
		name: '',
		categories: '',
		sortBy :" "
	});

	useEffect(() => {
		console.log(filter);
	}, [filter]);

	const { baseUrl } = useContext(BackendContext);
	useEffect(() => {
		fetch(`${baseUrl}api/v1/products/categories`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('categories = ', data);
				setState((ref) => ({ ...ref, categories: data }));
			})
			.catch((err) => {
				console.log(err);
			});

		fetch(`${baseUrl}api/v1/products`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('products = ', data);
				setState((ref) => ({ ...ref, products: data }));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	
	const handleFilterChange = (event) => {
		// const { categories } = state;
		const { name, value } = event.target;
		// console.log(value);
		setFilter((ref) => ({ ...ref, [name]: value }));
	};

	const handleFilter = () => {
		const { categories, name , sortBy} = filter;

		let query = ``;
		if (name) {
			query += `?name=${name}`;
		}
		if (categories) {
			query += `&categories=${categories}`;
		}


		// fetch data from backend to follow the constraints of the filter.
		fetch(`${baseUrl}api/v1/products?name=${name}&category=${categories}&sortBy=${sortBy}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setState((ref) => ({ ...ref, products: data }));
			})
			.catch((err) => console.log(err));
	};
	return (
		<div>
			{/* <Header />
			Product
			<br />
			<br /> */}
			<div className="content-container">
				<div className="body-container">
					<div>
						<div className="filter-section">
							<h3>Filter By</h3>
							<Box>
								<FormControl
									fullWidth
									sx={{ marginBottom: '15px' }}
								>
									<TextField
										id="name"
										label="Name"
										variant="outlined"
										value={filter.name}
										name={'name'}
										onChange={handleFilterChange}
									/>
								</FormControl>
								<FormControl
									fullWidth
									sx={{
										marginBottom: '15px',
										textAlign: 'left',
									}}
								>
									<InputLabel id="demo-simple-select-label">
										Categories
									</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={filter.categories}
										name={'categories'}
										label="Categories"
										onChange={handleFilterChange}
									>
										{state.categories?.map(
											(element, elemId) => {
												return (
													<MenuItem
														value={element}
														key={elemId}
													>
														{element}
													</MenuItem>
												);
											},
										)}
									</Select>
								</FormControl>
								<FormControl
									fullWidth
									sx={{
										marginBottom: '15px',
										textAlign: 'left',
									}}
								>
										
									<InputLabel id="sortBy">Sort By</InputLabel>
									<Select
										name={'sortBy'}
										value={filter.sortBy}
										label="Sort By"
										onChange={handleFilterChange}
									>
										<MenuItem value="">None</MenuItem>
										<MenuItem value="name">Name</MenuItem>
										<MenuItem value="category">
											Category
										</MenuItem>
										<MenuItem value="price">Price</MenuItem>
										<MenuItem value="availableItems">
											Availability
										</MenuItem>
									</Select>
								</FormControl>
								<FormControl fullWidth>
									<Button
										variant="contained"
										onClick={handleFilter}
									>
										apply
									</Button>
								</FormControl>
							</Box>
						</div>
					</div>
					<div className="content-section">
						{state.products?.map((elem, elemId) => {
							return (
								<Link to={`/products/${elem._id}`}>
									<ProductCard key={elemId} product={elem} />
								</Link>
							);
						})}
					</div>
				</div>
			</div>
        </div>	
	);
};

export default Products;

// availableItems:40
// category:"Footwear"
// description:"Stylish and comfortable sneakers for everyday wear."
// imageURL:"https://static.nike.com/a/images/t_default/fdded470-0ac5-4bd7-b41b-1bb63e161438/custom-nike-air-force-1-mid-by-you-shoes.png"
// manufacturer:"ShoeZone"
// name:"Casual Sneakers"
// price:60
// _id:"64723e7e12dcf13ec11b7b65"
