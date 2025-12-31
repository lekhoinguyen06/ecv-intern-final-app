"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const log_service_1 = require("../log/log.service");
let HTTPExceptionFilter = class HTTPExceptionFilter {
    logService;
    constructor(logService) {
        this.logService = logService;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const errorDetails = {
            code: status,
            name: exception.name,
            message: exception.message,
            timestamp: new Date().toISOString(),
            path: request.url,
        };
        this.logService.error(exception.message, exception);
        const res = {
            status: 'error',
            statusCode: status,
            error: errorDetails,
        };
        response.status(status).json(res);
    }
};
exports.HTTPExceptionFilter = HTTPExceptionFilter;
exports.HTTPExceptionFilter = HTTPExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [log_service_1.LogService])
], HTTPExceptionFilter);
//# sourceMappingURL=http.filter.js.map