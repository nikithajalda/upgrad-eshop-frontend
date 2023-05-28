import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
import React from 'react';

const ProductCard = ({ product }) => {
	return (
		<Card
			sx={{
				width: '300px',
				margin: '10px',
			}}
		>
			<CardActionArea>
				<CardMedia
					component="img"
					sx={{ height: 'auto' }}
					image={product.imageURL}
					alt="bag"
				/>
				<CardContent>
					<Typography
						gutterBottom
						variant="h6"
						sx={{ textAlign: 'left' }}
						component="div"
					>
						{product.name}
					</Typography>
					<Typography
						gutterBottom
						variant="h6"
						sx={{ textAlign: 'left' }}
						component="div"
					>
						{product.description}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ProductCard;
