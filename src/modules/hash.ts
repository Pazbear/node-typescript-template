const bcrypt = require("bcrypt");
const saltRounds = 64;

export default {
  encryptPassword: async (password: string) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  },

  comparePassword: async (plainPassword: string, password: string) => {
    return await bcrypt.compare(plainPassword, password);
  },
};
