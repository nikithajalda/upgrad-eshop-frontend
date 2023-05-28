import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Layout from './components/layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import { BackendContext } from './context/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<BackendContext.Provider
				value={{ baseUrl: 'http://localhost:3001/' }}
			>
				<Layout>
					<App />
				</Layout>
			</BackendContext.Provider>
		</BrowserRouter>
	</React.StrictMode>,
);
