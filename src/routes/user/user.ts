import express from "express";
import * as userServices from "../../controllers/user";
import { authChecker } from "../../middleware/userCheck";
import {
  loginValidate,
  registerValidate,
  sendForgotPasswordMailValidate,
  sendVerificationValidate,
  verifyForgotMailValidate,
  verifyUserMailValidate,
} from "../../validation/user/userValidation";
const router = express.Router();

router.get("/all", authChecker, userServices.getAllUsers);
router.post("/register", registerValidate, userServices.register);
router.post("/login", loginValidate, userServices.login);
router.post(
  "/send-verification-mail",
  sendVerificationValidate,
  userServices.sendVerificationMail
);
router.post(
  "/verify-user",
  verifyUserMailValidate,
  userServices.verifyUserMail
);
router.post(
  "/forgot-password",
  sendForgotPasswordMailValidate,
  userServices.sendForgotPasswordMail
);
router.post(
  "/verify-forgot-mail",
  verifyForgotMailValidate,
  userServices.verifyForgotMail
);
export default router;
