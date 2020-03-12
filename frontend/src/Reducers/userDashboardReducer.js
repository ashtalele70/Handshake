import * as types from '../Types/types';

const initialState = {
    alljobs: [],
	filterjobs: [],
	showjob: false,
	resume: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
		case types.ALL_JOBS :
			return Object.assign({}, state, {
				alljobs : action.payload.data
			})
		case types.FILTER_JOBS :
			return Object.assign({}, state, {
				filterjobs : action.payload.data
			})
		case types.SHOW_SELECTED_JOB :
		return Object.assign({}, state, {
			showjob : action.payload.data
		})
		case types.UPLOAD_RESUME :
		return Object.assign({}, state, {
			resume : action.payload.data
		})
        default: 
            return state;
    }
}