const express = require("express");


module.exports =  () =>{ 
    const user = require("../controllers/UserController/user.controller")
    const router = express.Router();

    // Retailer Dashboard Routes
    router.post("/signup", user.postSignup);
    router.post("/login", user.postLogin);  
    router.get("/getprofile", user.getProfile);
    router.post("/updateprofile", user.postUpdateProfile);
    router.post("/deleteuser", user.postDeleteUser);
    router.get("/addashboard", user.getAdminDashboardData);

    return router;
};