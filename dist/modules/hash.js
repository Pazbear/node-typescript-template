"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const saltRounds = 10;
exports.default = {
    encryptPassword: async (password) => {
        console.log(password);
        const salt = await bcrypt.genSalt(saltRounds);
        console.log(salt);
        return await bcrypt.hash(password, salt);
    },
    comparePassword: async (plainPassword, password) => {
        return await bcrypt.compare(plainPassword, password);
    },
};
//# sourceMappingURL=hash.js.map