import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import profileReducer from './profileReducer';
import userDashboardReducer from './userDashboardReducer';
import studentEventReducer from './eventReducer';

const rootReducer = combineReducers({
    userLoginData: loginReducer,
	profileData : profileReducer,
	userDashboardData : userDashboardReducer,
	studentEventData : studentEventReducer,
});

export default rootReducer;