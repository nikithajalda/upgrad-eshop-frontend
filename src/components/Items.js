import React from 'react';

const Items = () => {
	return (
		<div>
			<div className="items-info">
				<div className="product-img">
					<img
						src="https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-m20-m205f-1.jpg"
						alt="image"
					/>
				</div>

				<div className="title">
					<h2>Samsung</h2>
					<p>Red color</p>
				</div>
				<div className="add-quantity">
					<Button className="minus-btn">
						<AiOutlineMinus />
					</Button>
					<input type="text" className="textField" placeholder="3" />
					<Button className="plus-btn">
						<AiOutlinePlus />
					</Button>
				</div>
				<div className="price">
					<h3>2000Rs</h3>
				</div>
				<div className="remove-item">
					<Button>
						<IconContext.Provider
							value={{ color: 'red', size: '1.3em' }}
						>
							<FaTrash />
						</IconContext.Provider>
					</Button>
				</div>
			</div>
			<hr />
		</div>
	);
};

export default Items;
