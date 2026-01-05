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
exports.MetricService = void 0;
const common_1 = require("@nestjs/common");
const log_service_1 = require("./log.service");
let MetricService = class MetricService {
    logService;
    metrics = {};
    constructor(logService) {
        this.logService = logService;
    }
    onModuleInit() {
        this.scheduleDailyLog();
    }
    track(statusCode) {
        const key = statusCode.toString();
        if (!this.metrics[key]) {
            this.metrics[key] = 0;
        }
        this.metrics[key]++;
    }
    scheduleDailyLog() {
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
        const timeUntilMidnight = tomorrow.getTime() - now.getTime();
        setTimeout(() => {
            this.logAndReset();
            setInterval(() => {
                this.logAndReset();
            }, 24 * 60 * 60 * 1000);
        }, timeUntilMidnight);
    }
    logAndReset() {
        const totalRequests = Object.values(this.metrics).reduce((a, b) => a + b, 0);
        if (totalRequests > 0) {
            const payload = {
                period: 'daily',
                timestamp: new Date().toISOString(),
                totalRequests,
                statusCodeBreakdown: { ...this.metrics },
            };
            this.logService.metric(payload);
        }
        this.metrics = {};
    }
};
exports.MetricService = MetricService;
exports.MetricService = MetricService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [log_service_1.LogService])
], MetricService);
//# sourceMappingURL=metric.service.js.map