import {
	REGISTER_SUCCESS_C,
	//REGISTER_FAIL,
	USER_LOADED_C,
	//AUTH_ERROR,
	LOGIN_SUCCESS_C,
	//LOGIN_FAIL,
	LOGOUT_C,
	ACCOUNT_DELETED_C
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
		case USER_LOADED_C:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload
			};
		case REGISTER_SUCCESS_C:
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			};
		case LOGIN_SUCCESS_C:
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			};
		case ACCOUNT_DELETED_C:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
			};
		case LOGOUT_C:
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