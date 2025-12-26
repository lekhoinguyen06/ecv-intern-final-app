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
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const log_service_1 = require("../log/log.service");
let AllExceptionsFilter = class AllExceptionsFilter {
    logService;
    constructor(logService) {
        this.logService = logService;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        this.logService.error('Unhandled exception: ', exception);
        const res = {
            status: 'error',
            statusCode: 500,
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                name: 'InternalServerError',
                message: 'An unexpected error occurred',
                timestamp: new Date().toISOString(),
                path: request.url,
            },
        };
        response.status(500).json(res);
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [log_service_1.LogService])
], AllExceptionsFilter);
//# sourceMappingURL=fallback.filter.js.map