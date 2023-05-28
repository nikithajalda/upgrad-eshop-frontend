import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import banner from '../assets/banner.jpg';
import product from '../assets/product.jfif';
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import ProductCard from '../components/ProductCard';
import { BackendContext } from '../context/context';

const Home = () => {
	const [item, setItem] = useState([]);
	const { baseUrl } = useContext(BackendContext);

	const getApi = async () => {
		const response = await fetch(`${baseUrl}api/v1/products`);
		// console.log(response);
		setItem(await response.json());
	};

	useEffect(() => {
		getApi();
	}, []);

	return (
		<div>
			<div className="banner-container">
				<img src={banner} alt="banner" />
			</div>
			<div className="display-products">
				<Link to="/products">View more</Link>
			</div>
			<div className="card-container">
				{item.map((element, elemId) => {
					return (
						<Link to={`/products/${element.id}`}>
							<ProductCard
								className="card"
								key={elemId}
								product={element}
							/>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Home;
