import * as types from '../Types/types';

const initialState = {
	studentDetails : null,
	studentEducationDetails : null,
	displayModal: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        // case types.PROFILE_UPDATE :
        //     return Object.assign({}, state, {
        //         profileupdate : action.payload.profileupdate,
        //         getprofile : action.payload.getprofile
		// 	})
		case types.STORE_STUDENT_DETAILS :
			return Object.assign({}, state, {
				studentDetails : action.payload
			})
		case types.STORE_STUDENT_EDUCATION_DETAILS :
			return Object.assign({}, state, {
				studentEducationDetails : action.payload
			})
		case types.STORE_STUDENT_EXPERIENCE_DETAILS :
		return Object.assign({}, state, {
			studentExperienceDetails : action.payload
		})
		case types.STORE_CONTROL_MODAL :
			return Object.assign({}, state, {
				displayModal : action.payload.data	
			})
        default:
            return state;
    }
}