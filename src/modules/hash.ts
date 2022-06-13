const bcrypt = require("bcrypt");
const saltRounds = 10;

export default {
  encryptUserId: async (userId: string): Promise<string> => {
    return await bcrypt.hash(userId, 8);
  },

  encryptPassword: async (password: string) => {
    console.log(password);
    const salt = await bcrypt.genSalt(saltRounds);
    console.log(salt);
    return await bcrypt.hash(password, salt);
  },

  comparePassword: async (plainPassword: string, password: string) => {
    return await bcrypt.compare(plainPassword, password);
  },
};
