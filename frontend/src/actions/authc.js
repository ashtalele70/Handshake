import axios from 'axios';
import { setAlert } from './alert';
import {
	REGISTER_SUCCESS_C,
	REGISTER_FAIL_C,
	USER_LOADED_C,
	AUTH_ERROR_C,
	LOGIN_SUCCESS_C,
	LOGIN_FAIL_C,
	LOGOUT_C,
	CLEAR_PROFILE_C
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
	console.log("inside loadUser first line");
	if (localStorage.token) {
		console.log("inside loadUser");
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('http://localhost:3000/authc');

		dispatch({
			type: USER_LOADED_C,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR_C
		});
	}
};

// Register User
export const register = ({ LOCATION, EMAIL_ID, PASSWORD, COMPANY_NAME }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({ LOCATION, EMAIL_ID, PASSWORD, COMPANY_NAME });

	try {
		const res = await axios.post('http://localhost:3000/companies', body, config);

		dispatch({
			type: REGISTER_SUCCESS_C,
			payload: res.data
		});
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: REGISTER_FAIL_C
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
		const res = await axios.post('http://localhost:3000/authc', body, config);

		dispatch({
			type: LOGIN_SUCCESS_C,
			payload: res.data
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: LOGIN_FAIL_C
		});
	}
};

// Logout / Clear Profile
export const logout = () => dispatch => {
	dispatch({ type: CLEAR_PROFILE_C });
	dispatch({ type: LOGOUT_C });
};