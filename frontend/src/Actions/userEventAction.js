/* global localStorage */
import * as type from '../Types/types';

export const showAllEvents = (data) => {
    return {
        type : type.ALL_EVENTS,
        payload : {
            data
        }
    }
}

export const showFilterEvents = (data) => {
    return {
        type : type.FILTER_EVENTS,
        payload : {
            data
        }
    }
}

export const showSelectedEvent = (data) => {
    return {
        type : type.SHOW_SELECTED_EVENT,
        payload : {
            data
        }
    }
}
