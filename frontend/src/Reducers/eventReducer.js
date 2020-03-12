import * as types from '../Types/types';

const initialState = {
    allevents: [],
	filterevents: [],
	showevent: false
}

export default function (state = initialState, action) {
    switch (action.type) {
		case types.ALL_EVENTS :
			return Object.assign({}, state, {
				allevents : action.payload.data
			})
		case types.FILTER_EVENTS :
			return Object.assign({}, state, {
				filterevents : action.payload.data
			})
		case types.SHOW_SELECTED_EVENT :
		return Object.assign({}, state, {
			showevent : action.payload.data
		})
        default: 
            return state;
    }
}