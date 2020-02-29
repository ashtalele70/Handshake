import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	ACCOUNT_DELETED
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload
			};
		case REGISTER_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			};
		// case REGISTER_FAIL:
		// case AUTH_ERROR:
		// case LOGIN_FAIL:
		// 	//localStorage.removeItem('token', payload.token);
		// 	return {
		// 		...state,
		// 		//...payload,
		// 		token: null,
		// 		isAuthenticated: false,
		// 		loading: false,
		// 		user: null
		// 	};
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			};
		case ACCOUNT_DELETED:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
			};
		case LOGOUT:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
			};
		default:
			return state;
	}
}