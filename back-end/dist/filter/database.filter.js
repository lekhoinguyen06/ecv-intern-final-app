"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const pgErrorMapper_1 = __importDefault(require("./pgErrorMapper"));
let DatabaseExceptionFilter = class DatabaseExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = 500;
        const pgErrorCode = exception.driverError?.['code'] ?? '';
        response.status(status).json({
            status: 'error',
            statusCode: status,
            error: {
                code: (0, pgErrorMapper_1.default)(pgErrorCode),
                message: exception.message,
                timestamp: new Date().toISOString(),
                path: request.url,
            },
        });
    }
};
exports.DatabaseExceptionFilter = DatabaseExceptionFilter;
exports.DatabaseExceptionFilter = DatabaseExceptionFilter = __decorate([
    (0, common_1.Catch)(typeorm_1.QueryFailedError)
], DatabaseExceptionFilter);
//# sourceMappingURL=database.filter.js.map