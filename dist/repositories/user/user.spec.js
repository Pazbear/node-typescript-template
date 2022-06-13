"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mongo_1 = require("../../loader/mongo");
const user_1 = require("./user");
describe("User Repository", () => {
    let mongoClient;
    beforeAll(async () => {
        mongoClient = await (0, mongo_1.connectDB)(process.env.TEST_MONGO_URL);
    });
    afterAll(async () => {
        await mongoClient.connection.dropDatabase();
    });
    afterEach(async () => {
        await mongoClient.connection.db.dropDatabase();
    });
    test("Get all users", async () => {
        const users = await (0, user_1.findAllUsers)();
        expect(users.length).toBe(0);
    });
    test("Create User", async () => {
        const newUser = {
            nickname: "testUser",
            email: "email@email.com",
            password: "password",
        };
        await (0, user_1.createUser)(newUser);
        const users = await (0, user_1.findAllUsers)();
        expect(users.length).toBe(1);
    });
});
//# sourceMappingURL=user.spec.js.map