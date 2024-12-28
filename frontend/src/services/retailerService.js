import axios from "axios";

const getOrders = async (token) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/retailer/order`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
}

const getDashboard = async (token) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/retailer/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
}

const addProduct = async (token, product) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/retailer/addproduct`, product, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
}

const deleteProduct = async (id) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/retailer/deleteproduct`, { id });
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
}

const getVoucher = async (token) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/retailer/voucher`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
}

const addVoucher = async (token, voucher) => {
    try {
        const response = await axios.post(
            `http://localhost:8080/api/retailer/addvoucher`,
            voucher,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response;
    } catch (e) {
        if (e.response) {
            console.error("Server responded with an error:", e.response.status, e.response.data);
            return e.response;
        } else if (e.request) {
            console.error("No response received from server. Check the network or server:", e.request);
        } else {
            console.error("Error in request setup:", e.message);
        }
        return { status: "error", message: e.message };
    }
};

const getRetailerProfile = async (token) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/user/getprofile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (e) {
        console.log(e.response);
        return e.response || { error: 'An error occurred while fetching profile.' };
    }
};

const updateRetailerProfile = async (token, data) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/user/updateprofile`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (e) {
        console.log(e.response);
        return e.response || { error: 'An error occurred while updating profile.' };
    }
};

const deleteVoucher = async (id) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/retailer/deletevoucher`, { id });
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
};

const updateVoucher = async (id, voucher) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/retailer/updatevoucher`, {id, voucher});
        return response;
    } catch (e) {
        if (e.response) {
            console.error("Server responded with an error:", e.response.status, e.response.data);
            return e.response;
        } else if (e.request) {
            console.error("No response received from server. Check the network or server:", e.request);
        } else {
            console.error("Error in request setup:", e.message);
        }
        return { status: "error", message: e.message };
    }
};

export const retailerService = {
    getDashboard,
    deleteProduct,
    getVoucher,
    addVoucher,
    getRetailerProfile,
    updateRetailerProfile,
    deleteVoucher,
    updateVoucher,
};