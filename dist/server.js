"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const mongo_1 = require("./loader/mongo");
dotenv_1.default.config();
const env = process.env.ENV;
const PORT = env === "PROD" ? process.env.PROD_SERVER_PORT : process.env.DEV_SERVER_PORT;
const MONGO_URL = (env === "PROD"
    ? process.env.PROD_MONGO_URL
    : env === "TEST"
        ? process.env.TEST_MONGO_URL
        : process.env.DEV_MONGO_URL);
(async () => {
    try {
        await (0, mongo_1.connectDB)(MONGO_URL);
        console.log("MongoDB Connected");
    }
    catch (err) {
        console.error("Error with MongoDB Connecting");
        console.error(err);
    }
})();
app_1.default.get("/", (req, res, next) => {
    console.log(req.session);
    res.send(req.session);
});
const server = new http_1.default.Server(app_1.default);
server.listen(PORT, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: ${PORT}  🛡️
    ################################################
  `);
});
exports.default = app_1.default;
//# sourceMappingURL=server.js.map