import React from 'react';
import { useState, useEffect } from 'react/cjs/react.development';

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
	// const context = useContext(AuthContext);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const loginHandler = (email, password) => {
		localStorage.setItem('isLoggedIn', 'loggedIn');
		setIsLoggedIn(true);
	};

	const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn');
		setIsLoggedIn(false);
	};

	useEffect(() => {
		const storedUserLoginCreds = localStorage.getItem('isLoggedIn');

		if (storedUserLoginCreds === 'loggedIn') {
			setIsLoggedIn(true);
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogin: loginHandler,
				onLogout: logoutHandler,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
