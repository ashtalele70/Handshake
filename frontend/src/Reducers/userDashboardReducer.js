import * as types from '../Types/types';

const initialState = {
    alljobs: [],
    filterjobs: []
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
        default:
            return state;
    }
}