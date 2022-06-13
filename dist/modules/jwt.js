"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWT {
}
exports.default = JWT;
_a = JWT;
JWT.getUserId = (req) => {
    const token = _a.extractToken(req);
    if (!token) {
        return null;
    }
    const jwtPayload = _a.decodeJWT(token);
    return (jwtPayload === null || jwtPayload === void 0 ? void 0 : jwtPayload.id) || null;
};
JWT.extractToken = (req) => {
    const TOKEN_PREFIX = "Bearer ";
    const auth = req.headers.authorization;
    const token = (auth === null || auth === void 0 ? void 0 : auth.includes(TOKEN_PREFIX))
        ? auth.split(TOKEN_PREFIX)[1]
        : auth;
    return token;
};
JWT.decodeJWT = (token) => {
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        return decodedToken;
    }
    catch {
        return null;
    }
};
JWT.createJWT = async (user) => {
    const token = jsonwebtoken_1.default.sign({ _id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
    });
    return token;
};
//# sourceMappingURL=jwt.js.map