import React, { useReducer, useState, useEffect, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

import AuthContext from '../../context/authContext';

const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return {
			value: action.payload,
			isEmailValid: action.payload.includes('@'),
		};
	}
	if (action.type === 'INPUT_CHECK') {
		return { value: state.value, isEmailValid: state.value.includes('@') };
	}
	return { value: '', isEmailValid: false };
};

const passwordReducer = (state, action) => {
	if (action.type === 'USER_PASSWORD') {
		return {
			value: action.payload,
			isPasswordValid: action.payload.trim().length > 6,
		};
	}
	if (action.type === 'PASSWORD_CHECK') {
		return {
			value: state.value,
			isPasswordValid: state.value.trim().length > 6,
		};
	}
	return { value: '', isPasswordValid: false };
};

const Login = (props) => {
	const context = useContext(AuthContext);
	// const [enteredEmail, setEnteredEmail] = useState('');
	// const [emailIsValid, setEmailIsValid] = useState();
	// const [enteredPassword, setEnteredPassword] = useState('');
	// const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isEmailValid: null,
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isPasswordValid: null,
	});

	//using object destructuring to pull keys from an object and use them in useEffect hook
	const { isEmailValid } = emailState;
	const { isPasswordValid } = passwordState;

	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log('Checking for validity.');
			// this sets the validity once and doesn't checks it again until the dependencies have changed
			setFormIsValid(isEmailValid && isPasswordValid);
		}, 500);

		//This is called useEffect clean-up function- return of anonymous arrow function that cleans up the side effects from the useEffect hook before each run of useEffect() **(it doesn't run before the first time useEffect runs but runs before every consecutive run)**
		return () => {
			console.log('Clean-up done.');
			clearTimeout(identifier);
		};
		//these depencencies determine how often useEffect checks validity: only when they change
	}, [isEmailValid, isPasswordValid]);

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', payload: event.target.value });
		// setFormIsValid(
		// 	event.target.value.includes('@') && passwordState.isPasswordValid
		// );
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: 'USER_PASSWORD', payload: event.target.value });
		// setFormIsValid(
		// 	emailState.isEmailValid && event.target.value.trim().length > 6
		// );
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_CHECK' });
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: 'PASSWORD_CHECK' });
		// setPasswordIsValid(enteredPassword.trim().length > 6);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		context.onLogin(emailState.value, passwordState.value);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailState.isEmailValid === false ? classes.invalid : ''
					}`}>
					<label htmlFor="email">E-Mail</label>
					<input
						type="email"
						id="email"
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordState.isPasswordValid === false ? classes.invalid : ''
					}`}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={passwordState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn} disabled={!formIsValid}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
