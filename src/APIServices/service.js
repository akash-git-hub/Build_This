import { errorAlert } from "../components/Alert";
import http from "../http"


export const login_API = async (data) => {
    try {
        const resp = await http.post("/login", data);
        if (resp) {
            if (resp && resp.data && resp.data.data) {
                console.log(resp.data);
                // const ur_type = resp.data.data.user_type_id;
                // const urdata = resp.data.data;
                // const myid = resp.data.data._id;
                // const tokwn = resp.data.data.token;
                // const my_image = urdata.image || "";
                // localStorage.setItem('proimage', my_image);
                // localStorage.setItem('userData', JSON.stringify(urdata));
                // localStorage.setItem('Authorization', "Bearer " + tokwn);
                // localStorage.setItem('id', myid);
                // localStorage.setItem('type', ur_type);
            }
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            errorAlert(error.response.data.message);
        } else {
            errorAlert(error.response);
        }
    }
}

export const registration_API = async (data)=>{
    try {
        const resp = await http.post("/registration", data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }else{
            console.log(resp);
            errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            errorAlert(error.response.data.message);
        } else {
            errorAlert(error.response);
        }
    }
}