"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = exports.getAllUsers = void 0;
const user_1 = require("../repositories/user/user");
const hash_1 = __importDefault(require("../modules/hash"));
const jwt_1 = __importDefault(require("../modules/jwt"));
async function getAllUsers(req, res) {
    try {
        console.log("getAllUser");
        res.status(200).send({ users: await (0, user_1.findAllUsers)() });
    }
    catch (err) {
        console.error(err);
        return res.status(500).send({ err: "서버 내부 에러" });
    }
}
exports.getAllUsers = getAllUsers;
async function register(req, res) {
    try {
        console.log("register");
        const encryptedPassword = await hash_1.default.encryptPassword(req.body.password);
        console.log(encryptedPassword);
        const newUser = {
            nickname: req.body.nickname,
            email: req.body.email,
            password: encryptedPassword,
            avatar: req.body.avatar,
        };
        await (0, user_1.createUser)(newUser);
        return res.status(201).send();
    }
    catch (err) {
        console.error(err);
        return res.status(500).send({ err: "서버 내부 에러" });
    }
}
exports.register = register;
async function login(req, res) {
    try {
        const user = await (0, user_1.findUserByEmail)(req.body.email);
        if (user) {
            const isValid = await hash_1.default.comparePassword(req.body.password, user.password);
            if (isValid) {
                console.log(user.id);
                return res.status(200).send({ token: await jwt_1.default.createJWT(user) });
            }
            else {
                return res.status(401).send({ err: "비밀번호가 틀렸습니다." });
            }
        }
        else {
            return res.status(401).send({ err: "유저가 존재하지 않습니다." });
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).send({ err: "서버 내부 오류" });
    }
}
exports.login = login;
async function logout(req, res) {
    try {
        req.session.destroy(() => {
            res.clearCookie(process.env.SESSION_COOKIE_NAME);
            return res.status(200).send();
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).send({ err: "서버 내부 에러" });
    }
}
exports.logout = logout;
//# sourceMappingURL=user.js.map