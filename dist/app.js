"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression")); //응답 본문 압축 => 응답하는 데이터의 크기가 큰 경우 사용( ex. 파일 )
const index_1 = __importDefault(require("./routes/index"));
const token_checker_1 = require("./middleware/token_checker");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, compression_1.default)());
app.use(token_checker_1.tokenChecker); //jwt token middleware
app.use("/", index_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map