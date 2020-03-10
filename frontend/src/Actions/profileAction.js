import { PROFILE_UPDATE } from '../Types/types';
import { STORE_STUDENT_DETAILS } from '../Types/types';
import { STORE_STUDENT_EDUCATION_DETAILS } from '../Types/types';
import { STORE_STUDENT_EXPERIENCE_DETAILS } from '../Types/types';
import {STORE_CONTROL_MODAL} from '../Types/types';

export function profileupdate(profiledata){
    return {
        type : PROFILE_UPDATE,
        payload : {
            profileupdate : profiledata.profileupdate,
            getprofile : profiledata.getprofile
        }
    }
}

export function storeStudentDetails(data){
    return {
        type : STORE_STUDENT_DETAILS,
        payload : {
            data
        }
    }
}

export function storeStudentEducationDetails(data){
    return {
        type : STORE_STUDENT_EDUCATION_DETAILS,
        payload : {
            data
        }
    }
}

export function storeStudentExperienceDetails(data){
    return {
        type : STORE_STUDENT_EXPERIENCE_DETAILS,
        payload : {
            data
        }
    }
}

export function controlModal(data){
    return {
        type : STORE_CONTROL_MODAL,
        payload : {
            data
        }
    }
}