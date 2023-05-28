import './form.css';
import { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { validateLogin } from '../utils/helper';
import { BackendContext, SessionContext } from '../context/context';
import jwt_decode from 'jwt-decode';
import { Button, TextField } from '@mui/material';

const LoginForm = () => {
	const { baseUrl } = useContext(BackendContext);
	const { setState } = useContext(SessionContext);

	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUser((ref) => ({ ...ref, [name]: value }));
		//{email:'',password:''}
	};

	const submitForm = (e) => {
		e.preventDefault();
		const isValid = validateLogin(user);

		if (!isValid) {
			console.log("Email password can't be empty");
			return;
		}

		fetch(`${baseUrl}api/v1/auth`, {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(user),
		})
			.then((response) => {
				const token = response.headers.get('X-Auth-Token');
				console.log(token);
				const decode = jwt_decode(token);
				console.log(decode);
				sessionStorage.setItem('uuid', decode._id);
				sessionStorage.setItem('isAdmin', decode.isAdmin);
				return response.json();
			})
			.then((data) => {
				console.log(data);
				sessionStorage.setItem('name', data.name);
				sessionStorage.setItem('email', data.email);
				//set Cookie

				setState({ username: data.name, email: data.email });
			})
			.catch((err) => {
				console.log(err);
			});
		setUser({ email: '', password: '' });
	};
	return (
		<Fragment>
			<div className="form-container login-container">
				<h2>Login</h2>

				<form onSubmit={submitForm}>
					<div className="data-field-container">
						<div className="data-field">
							<TextField
								type="text"
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
						</div>
					</div>
					<div className="btn">
						<Button
							variant="contained"
							type="submit"
							className="button"
						>
							Login
						</Button>
					</div>
					<p>
						Do you have an account?
						<Link to="/signup">
							<a> Create one</a>
						</Link>
					</p>
				</form>
			</div>
		</Fragment>
	);
};
export default LoginForm;
