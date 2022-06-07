import express from "express";
import * as userServices from "../../services/user";
const router = express.Router();

router.get("/all", userServices.getAllUsers);
router.post("/register", userServices.register);
router.post("/login", userServices.login);
router.get("/logout", userServices.logout);

export default router;
