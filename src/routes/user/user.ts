import express from "express";
import * as userServices from "../../controllers/user";
import { authChecker } from "../../middleware/userCheck";
import {
  loginValidate,
  registerValidate,
} from "../../validation/user/userValidation";
const router = express.Router();

router.get("/all", authChecker, userServices.getAllUsers);
router.post("/register", registerValidate, userServices.register);
router.post("/login", loginValidate, userServices.login);
router.post("/send-verification-mail", userServices.sendVerificationMail);
router.post("/verify-user", userServices.verifyUserMail);

export default router;
