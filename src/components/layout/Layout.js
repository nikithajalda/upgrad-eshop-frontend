// import Navbar from '../Navbar';
import { SessionContext } from '../../context/context';
import { useEffect, useState } from 'react';
import Header from '../Header.js';
const Layout = ({ children }) => {
	const [state, setState] = useState({
		username: sessionStorage.getItem('name') || '',
		email: sessionStorage.getItem('email') || '',
		isAdmin: sessionStorage.getItem('isAdmin') || false,
	});
	// useEffect(() => {
	// 	setState({
	// 		username: sessionStorage.getItem('name') || 'Guest',
	// 		email: sessionStorage.getItem('email') || '',
	// 		isAdmin: sessionStorage.getItem('isAdmin') || false,
	// 	});
	// }, []);
	return (
		<div>
			<SessionContext.Provider
				value={{
					username: state.username,
					email: state.email,
					isAdmin: state.isAdmin,
					setState: setState,
				}}
			>
				<Header />
				<div
					style={{
						textAlign: 'center',
						width: '100%',
						margin: 'auto',
					}}
				>
					{children}
				</div>
			</SessionContext.Provider>
		</div>
	);
};

export default Layout;
