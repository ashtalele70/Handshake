/* global localStorage */
import * as type from '../Types/types';

export const showAllJobs = (data) => {
    return {
        type : type.ALL_JOBS,
        payload : {
            data
        }
    }
}

export const showFilterJobs = (data) => {
    return {
        type : type.FILTER_JOBS,
        payload : {
            data
        }
    }
}

