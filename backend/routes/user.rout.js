// import express from "express";
// import {login, register, updateProfile,logout } from "../controller/user.controller.js";
// import isAuthenticated from "../midllewares/isAuthenticated.js";
// import { singleUpload } from "../midllewares/multer.js"; 


// const router = express.Router();

// router.route("/register").post(signleUpload,register);
// router.route("/login").post(login);
// router.route("/logout").get(logout);
// router.route("/profile/update").post( isAuthenticated,updateProfile);

// export default router;


import express from "express";
import { login, register, updateProfile, logout } from "../controller/user.controller.js";
import isAuthenticated from "../midllewares/isAuthenticated.js";
import { singleUpload } from "../midllewares/multer.js"; 

const router = express.Router();

router.route("/register").post(singleUpload, register);   
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload, updateProfile);

export default router;
