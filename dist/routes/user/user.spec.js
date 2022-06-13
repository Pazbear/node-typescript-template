"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const mongo_1 = require("../../loader/mongo");
const agent = supertest_1.default.agent(app_1.default);
describe("User Routes", () => {
    let mongoClient;
    beforeAll(async () => {
        try {
            mongoClient = await (0, mongo_1.connectDB)(process.env.TEST_MONGO_URL);
        }
        catch (err) {
            console.error(err);
        }
    });
    afterAll(async () => {
        await mongoClient.connection.dropDatabase();
    });
    afterEach(async () => {
        await mongoClient.connection.db.dropDatabase();
    });
    test("/users/all", async () => {
        const res = await agent.get("/users/all").send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ users: [] });
    });
    test("/users/register", async () => {
        const newUser = {
            nickname: "newUser",
            email: "test@test.com",
            password: "password",
        };
        const res = await agent.post("/users/register").send(newUser);
        expect(res.statusCode).toEqual(201);
    });
    test("/users/login - 401", async () => {
        const loginInfo = {
            email: "test@test.com",
            password: "password",
        };
        const res = await agent.post("/users/login").send(loginInfo);
        expect(res.statusCode).toEqual(401);
    });
    test("/users/login - 200", async () => {
        const newUser = {
            nickname: "newUser",
            email: "test@test.com",
            password: "password",
        };
        const loginInfo = {
            email: "test@test.com",
            password: "password",
        };
        await agent.post("/users/register").send(newUser);
        const res = await agent.post("/users/login").send(loginInfo);
        expect(res.statusCode).toEqual(200);
    });
});
//# sourceMappingURL=user.spec.js.map