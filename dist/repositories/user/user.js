"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findUserByEmail = exports.findUserById = exports.findAllUsers = void 0;
const User_1 = require("../../db/models/User");
async function findAllUsers() {
    return await User_1.User.find();
}
exports.findAllUsers = findAllUsers;
async function findUserById(id) {
    return await User_1.User.findById(id);
}
exports.findUserById = findUserById;
async function findUserByEmail(email) {
    return await User_1.User.findOne({ email: email });
}
exports.findUserByEmail = findUserByEmail;
async function createUser(user) {
    const newUser = new User_1.User(user);
    await newUser.save();
}
exports.createUser = createUser;
//# sourceMappingURL=user.js.map