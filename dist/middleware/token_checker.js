"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenChecker = void 0;
const jwt_1 = __importDefault(require("../modules/jwt"));
const tokenChecker = function (req, res, next) {
    const userIdFromToken = jwt_1.default.getUserId(req);
    req.userId = userIdFromToken;
    next();
};
exports.tokenChecker = tokenChecker;
//# sourceMappingURL=token_checker.js.map