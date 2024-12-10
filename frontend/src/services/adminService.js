import axios from "axios";

const getAdminProfile = async (token) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/user/getprofile`);
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
}

const getAdminDashboard = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/user/admindashboard`);
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
}

export const adminService = { 
    getAdminProfile,
    getAdminDashboard
};