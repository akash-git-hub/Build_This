import { errorAlert } from "../components/Alert";
import http from "../http"

export const login_API = async (data) => {
    try {
        const resp = await http.post("/login", data);
        if (resp && resp.data && resp.data.success) {
            if (resp && resp.data && resp.data.data) {
                const token = resp.data && resp.data.data && resp.data.data.token;
                localStorage.setItem('Authorization', "Bearer " + token);
            }
            return resp.data;
        } else {
            errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}

export const registration_API = async (data) => {
    try {
        const resp = await http.post("/registration", data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}

export const updateUserProfileAPI = async (data) => {
    try {
        const resp = await http.post("/updateUserProfile", data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}

export const userProfileAPI = async () => {
    try {
        const resp = await http.get("/userProfile");
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            //  errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {           
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}

export const createSkills_API = async (data) => {
    try {
        const resp = await http.post("/createSkills", data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}

export const getMySkills_API = async () => {
    try {
        const resp = await http.get("/getMySkills");
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {          
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}

export const updateMySkills_API = async (data) => {
    try {
        const resp = await http.post("/updateMySkills", data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}

export const deleteSkills_API = async (data) => {
    try {
        const resp = await http.post("/deleteSkills", data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}

export const createCertificate_API = async (data) => {
    try {
        const resp = await http.post("/createCertificate", data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}

export const getMyCertificates_API = async () => {
    try {
        const resp = await http.get("/getMyCertificates");
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {           
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}

export const updateMyCertificate_API = async (data) => {
    try {
        const resp = await http.post("/updateMyCertificate", data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}

export const deleteCertificate_API = async (data) => {
    try {
        const resp = await http.post("/deleteCertificate", data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}

export const createAcademic_API = async (data) => {
    try {
        const resp = await http.post("/createAcademic", data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}

export const getAcademic_API = async () => {
    try {
        const resp = await http.get("/getAcademic");
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {         
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}

export const updateAcademic_API = async (data) => {
    try {
        const resp = await http.post("/updateAcademic", data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}

export const deleteAcademic_API = async (data) => {
    try {
        const resp = await http.post("/deleteAcademic", data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}

export const createProject_API = async (data) => {
    try {
        const resp = await http.post("/createProject", data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}

export const getMyProjects_API = async () => {
    try {
        const resp = await http.get("/getMyProjects");
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}


export const get_team_projectsAPI = async () => {
    try {
        const resp = await http.get("/get-team-projects");
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}


export const updateProject_API = async (data) => {
    try {
        const resp = await http.post("/updateProject", data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}


export const getAllUserListAPI = async () => {
    try {
        const resp = await http.get("/getAllUserList");
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}



export const getProjectsUserListAPI = async (prId) => {
    try {
        const resp = await http.get(`/getProjectsUserList?prId=${prId}`);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}


export const createInvitationAPI = async (data) => {
    try {
        const resp = await http.post("/createInvitation", data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}


export const uploadGroupImage = async (data) => {
    try {
        const resp = await http.post("/uploadGroupImage", data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}


export const getUserListProjectWiseAPI = async () => {
    try {
        const resp = await http.get("/getUserListProjectWise");
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            //  errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {          
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}

export const getUserProjectAssociateListAPI = async () => {
    try {
        const resp = await http.get("/getUserProjectAssociateList");
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            //  errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {           
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}


export const changeInviteStatusAPI = async (data) => {
    try {
        const resp = await http.post("/changeInviteStatus", data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.response);
        }
    }
}


export const searchChatListAPI = async (key) => {
    try {
        const resp = await http.get(`/searchChatList?searchKey=${key}`);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            // errorAlert(error.response.data.message);
        } else {
            errorAlert(error.response);
        }
    }
}