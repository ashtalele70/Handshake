import axios from 'axios';
import { setAlert } from './alert';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
	console.log("inside loadUser first line");
	if (localStorage.token) {
		console.log("inside loadUser method line");
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('http://localhost:3000/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};

// Register User
export const register = ({ FIRST_NAME, LAST_NAME, EMAIL_ID, PASSWORD, COLLEGE_NAME }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({ FIRST_NAME, LAST_NAME, EMAIL_ID, PASSWORD, COLLEGE_NAME });
	console.log(body);
	try {
		const res = await axios.post('http://localhost:3000/students', body, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: REGISTER_FAIL
		});
	}
};

// Login User
export const login = (EMAIL_ID, PASSWORD) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({ EMAIL_ID, PASSWORD });

	try {
		const res = await axios.post('http://localhost:3000/auth', body, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: LOGIN_FAIL,
			payload: localStorage.getItem('token')
		});
	}
};

// Logout / Clear Profile
export const logout = () => dispatch => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOGOUT });
};