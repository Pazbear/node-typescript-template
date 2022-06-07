const express = require("express");
const router = express.Router();

import userRouter from "../routes/user/user";
export default router.use("/users", userRouter);
