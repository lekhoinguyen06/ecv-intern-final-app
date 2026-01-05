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
exports.MetricInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const metric_service_1 = require("./metric.service");
let MetricInterceptor = class MetricInterceptor {
    metricService;
    constructor(metricService) {
        this.metricService = metricService;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.tap)({
            next: () => {
                const ctx = context.switchToHttp();
                const response = ctx.getResponse();
                this.metricService.track(response.statusCode);
            },
            error: (err) => {
                const status = err.status || err.statusCode || 500;
                this.metricService.track(status);
            },
        }));
    }
};
exports.MetricInterceptor = MetricInterceptor;
exports.MetricInterceptor = MetricInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [metric_service_1.MetricService])
], MetricInterceptor);
//# sourceMappingURL=metric.interceptor.js.map