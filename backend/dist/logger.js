"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customLogger = void 0;
const chalk_1 = __importDefault(require("chalk"));
const morgan_1 = __importDefault(require("morgan"));
function customLogger() {
    return (req, res, next) => {
        let resBody;
        let oldSend = res.send;
        res.send = function (data) {
            resBody = data;
            return oldSend.apply(res, arguments);
        };
        morgan_1.default.token('req-body', function (req, res) {
            return JSON.stringify(req.body);
        });
        morgan_1.default.format("customLogger", (tokens, req, res) => {
            if (tokens.status(req, res) == undefined) {
                return null;
            }
            const status = parseInt(tokens.status(req, res));
            const method = tokens.method(req, res);
            const endpoint = tokens.url(req, res);
            const resTime = tokens['response-time'](req, res);
            const reqBody = tokens['req-body'](req, res);
            const datetime = new Date().toLocaleString();
            if (status < 200) {
                console.log(chalk_1.default.yellow.bold(`${datetime} | `) + chalk_1.default.bgYellow.bold(` ${status} `) + chalk_1.default.yellow.bold(` | ${method} | URL : ${endpoint} | ${resTime} ms | Req-Body : ${reqBody} | Res-Body : ${resBody}`));
            }
            else if (status >= 200 && status < 300) {
                console.log(chalk_1.default.green.bold(`${datetime} | `) + chalk_1.default.bgGreen.bold(` ${status} `) + chalk_1.default.green.bold(` | ${method} | URL : ${endpoint} | ${resTime} ms | Req-Body : ${reqBody} | Res-Body : ${resBody}`));
            }
            else if (status >= 300 && status < 400) {
                console.log(chalk_1.default.blue.bold(` ${datetime} | `) + chalk_1.default.bgBlue.bold(` ${status} `) + chalk_1.default.blue.bold(` | ${method} | URL : ${endpoint} | ${resTime} ms | Req-Body : ${reqBody} | Res-Body : ${resBody}`));
            }
            else if (status >= 400 && status < 500) {
                console.log(chalk_1.default.red.bold(` ${datetime} | `) + chalk_1.default.bgRed.bold(` ${status} `) + chalk_1.default.red.bold(` | ${method} | URL : ${endpoint} | ${resTime} ms | Req-Body : ${reqBody} | Res-Body : ${resBody}`));
            }
            else {
                console.log(chalk_1.default.magenta.bold(` ${datetime} | `) + chalk_1.default.bgMagenta.bold(` ${status} `) + chalk_1.default.magenta.bold(` | ${method} | URL : ${endpoint} | ${resTime} ms | Req-Body : ${reqBody} | Res-Body : ${resBody}`));
            }
        });
        const loggerMiddleware = (0, morgan_1.default)("customLogger");
        loggerMiddleware(req, res, next);
    };
}
exports.customLogger = customLogger;
//# sourceMappingURL=logger.js.map