import * as types from '../Types/types';

const initialState = {
    alljobs: [],
	filterjobs: [],
	showjob: false
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
        default: 
            return state;
    }
}