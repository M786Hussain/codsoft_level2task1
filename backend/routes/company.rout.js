import express from "express";
// import {login, register, updateProfile,logout } from "../controller/user.controller.js";
import isAuthenticated from "../midllewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controller/company.controller.js";
import {singleUpload} from "../midllewares/multer.js";


const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated,singleUpload, updateCompany);

export default router;