const express = require("express");
const authenticateToken = require("../middleware")


module.exports =  () =>{ 
    const user = require("../controllers/UserController/user.controller")
    const router = express.Router();

    // Retailer Dashboard Routes
    router.post("/signup", user.postSignup);
    router.post("/login", user.postLogin);  
    router.get("/getprofile", authenticateToken, user.getProfile);
    router.post("/updateprofile", authenticateToken, user.postUpdateProfile);
    router.post("/deleteuser", authenticateToken, user.postDeleteUser);
    router.get("/admindashboard", user.getAdminDashboardData); 
    return router;  
};  