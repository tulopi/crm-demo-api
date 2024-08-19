"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInfo = logInfo;
exports.logWarning = logWarning;
exports.logError = logError;
const log4js_1 = __importDefault(require("log4js"));
log4js_1.default.configure({
    appenders: {
        miLoggerConsole: { type: "console" },
        miLoggerFileWarn: { type: "file", filename: "./LOGS/warn.log" },
        miLoggerFileError: { type: "file", filename: "./LOGS/error.log" },
    },
    categories: {
        default: { appenders: ["miLoggerConsole"], level: "trace" },
        info: { appenders: ["miLoggerConsole"], level: "info" },
        warn: { appenders: ["miLoggerConsole", "miLoggerFileWarn"], level: "warn" },
        error: {
            appenders: ["miLoggerConsole", "miLoggerFileError"],
            level: "error",
        },
    },
});
const loggerInfo = log4js_1.default.getLogger("info");
const loggerWarn = log4js_1.default.getLogger("warn");
const loggerError = log4js_1.default.getLogger("error");
function logInfo(msj) {
    loggerInfo.info(msj);
}
function logWarning(msj) {
    loggerWarn.warn(msj);
}
function logError(msj) {
    loggerError.error(msj);
}
