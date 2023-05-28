import React, { Fragment, useContext, useEffect, useState } from 'react';
import './form.css';
import { Link } from 'react-router-dom';
import { validateSignup } from '../utils/helper';
import { BackendContext } from '../context/context';
import { Button, TextField } from '@mui/material';

const SignupForm = () => {
	const { baseUrl } = useContext(BackendContext);
	console.log(baseUrl);

	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		contactNumber: '',
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		console.log(`name = ${name}`);
		console.log(`value = ${value}`);
		// console.log(`using dot notation = ${user.name}`);
		// console.log(`using [] notation = ${user[name]}`);
		// console.log(`using [] notation = ${user['name']}`);

		setUser((ref) => ({ ...ref, [name]: value }));
	};
	useEffect(() => {
		console.log('user =', user);
	}, [user]);

	const [allArray, setAllArray] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const { firstName, lastName, email, password, contactNumber } = user;
		const isValid = validateSignup(user);
		if (!isValid) {
			console.log('Try again');
			return;
		}

		fetch(`${baseUrl}api/v1/users`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(user),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.log(error);
			});
		setUser({
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			contactNumber: '',
		});
	};

	return (
		<Fragment>
			<div className="form-container">
				{/* <div className="title"> */}
				<h2>Sign Up</h2>
				{/* </div> */}

				<form onSubmit={handleSubmit}>
					<div className="name-field-container">
						<div className="name-field">
							<TextField
								type="text"
								placeholder="Firstname"
								id="firstname"
								name="firstName"
								value={user.firstName}
								onChange={handleChange}
								className="name-field text-field"
							/>
							<TextField
								type="text"
								placeholder="Lastname"
								id="lastname"
								name="lastName"
								value={user.lastName}
								onChange={handleChange}
								className="name-field text-field"
							/>
						</div>
					</div>
					<div className="data-field-container">
						<div className="data-field">
							<TextField
								type="email"
								placeholder="Email"
								id="email"
								name="email"
								value={user.email}
								onChange={handleChange}
								className="text-field"
							/>
							<TextField
								type="password"
								placeholder="Password"
								id="password"
								name="password"
								value={user.password}
								onChange={handleChange}
								className="text-field"
							/>
							<TextField
								type="text"
								placeholder="Contact"
								id="contact"
								name="contactNumber"
								value={user.contactNumber}
								onChange={handleChange}
								className="text-field"
							/>
						</div>
					</div>
					<div className="btn">
						<Button
							className="button"
							variant="contained"
							type="submit"
						>
							Sign up
						</Button>
					</div>
					<p>
						Already have an account? <Link to="/login">Login </Link>
					</p>
				</form>
			</div>
		</Fragment>
	);
};
export default SignupForm;
