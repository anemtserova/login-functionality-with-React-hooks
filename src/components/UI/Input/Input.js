import React, { useRef, useImperativeHandle } from 'react';

import classes from './Input.module.css';

//forwardRef takes the whole component function as anonymous function and uses props and ref arguments
const Input = React.forwardRef((props, ref) => {
	const inputRef = useRef();

	const activate = () => {
		inputRef.current.focus();
	};

	//useImperativeHadle takes two arguments: ref and anonymous function containing an object that can be used from outside of the component by binding it to useRef hook (in the parent Login.js)
	useImperativeHandle(ref, () => {
		return { focus: activate };
	});

	return (
		<div
			className={`${classes.control} ${
				props.isEmailValid === false ? classes.invalid : ''
			}`}>
			<label htmlFor={props.id}>{props.title}</label>
			<input
				ref={inputRef}
				type={props.type}
				id={props.id}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
			/>
		</div>
	);
});

export default Input;
