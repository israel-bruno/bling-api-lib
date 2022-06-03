"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError {
    constructor(message, data) {
        this.message = message;
        this.data = data;
    }
}
exports.AppError = AppError;
