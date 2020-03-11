import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import profileReducer from './profileReducer';
import userDashboardReducer from './userDashboardReducer';

const rootReducer = combineReducers({
    userLoginData: loginReducer,
	profileData : profileReducer,
	userDashboardData : userDashboardReducer
});

export default rootReducer;