"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const user_1 = __importDefault(require("../routes/user/user"));
exports.default = router.use("/users", user_1.default);
//# sourceMappingURL=index.js.map