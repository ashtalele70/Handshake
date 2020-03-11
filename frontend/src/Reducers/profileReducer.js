import * as types from '../Types/types';
import user from '../Components/studentProfile/user.png';

const initialState = {
    studentDetails: null,
    studentEducationDetails: [],
    studentExperienceDetails: null,
    skillset: [],
    mode: false,
    save: false,
    profile_pic: user,
    edMode: false,
    expMode: false
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
				studentEducationDetails : action.payload.data
			})
		case types.STORE_STUDENT_EXPERIENCE_DETAILS :
		return Object.assign({}, state, {
			studentExperienceDetails : action.payload.data
		})
		case types.STORE_CONTROL_MODAL :
			return Object.assign({}, state, {
				displayModal : action.payload.data	
		})
		case types.STORE_STUDENT_SKILLS:
			return Object.assign({}, state, {
				skillset: action.payload.data	
		})
		case types.CHANGE_MODE:
			return Object.assign({}, state, {
				mode: action.payload
		})
		case types.CHANGE_EDUCATION_MODE:
			return Object.assign({}, state, {
				edMode: action.payload	
		})
		case types.CHANGE_EXPERIENCE_MODE:
			return Object.assign({}, state, {
				expMode: action.payload	
		})
		case types.ENABLE_SAVE:
			return Object.assign({}, state, {
				save: action.payload	
		})
		case types.SAVE_PROFILE_PIC:
			return Object.assign({}, state, {
				profile_pic: action.payload.data	
		})
        default:
            return state;
    }
}