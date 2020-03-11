import * as type from '../Types/types';

export const profileupdate = (profiledata) => {
    return {
        type : type.PROFILE_UPDATE,
        payload : {
            profileupdate : profiledata.profileupdate,
            getprofile : profiledata.getprofile
        }
    }
}

export const storeStudentDetails = (data) => {
    return {
        type : type.STORE_STUDENT_DETAILS,
        payload : {
            data
        }
    }
}

export const storeStudentEducationDetails = (data) => {
    return {
        type : type.STORE_STUDENT_EDUCATION_DETAILS,
        payload : {
            data
        }
    }
}

export const storeStudentExperienceDetails = (data) => {
    return {
        type : type.STORE_STUDENT_EXPERIENCE_DETAILS,
        payload : {
            data
        }
    }
}

export const controlModal = (data) => {
    return {
        type : type.STORE_CONTROL_MODAL,
        payload : {
            data
        }
    }
}

export const saveSkillset = (data) => {
	return {
        type : type.STORE_STUDENT_SKILLS,
        payload : {
            data
        }
    }
};

export const changeMode = (data) => {
	return {
        type : type.CHANGE_MODE,
        payload : {
            data
        }
    }
};

export const changeEdMode = (data) => {	
	return {
        type : type.CHANGE_EDUCATION_MODE,
        payload : {
            data
        }
    }
};

export const changeExpMode = (data) => {
    return {
        type : type.CHANGE_EXPERIENCE_MODE,
        payload : {
            data
        }
    }
};

export const enableSave = (data) => {
    return {
        type : type.CHANGE_EXPERIENCE_MODE,
        payload : {
            data
        }
    }
};

export const saveProfilePic = (data) => {
    return {
        type : type.SAVE_PROFILE_PIC,
        payload : {
            data
        }
    }
};