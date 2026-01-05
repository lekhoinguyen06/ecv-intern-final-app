"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const log_service_1 = require("./log/log.service");
const http_filter_1 = require("./filter/http.filter");
const database_filter_1 = require("./filter/database.filter");
const response_intercept_1 = require("./intercept/response.intercept");
const metric_service_1 = require("./log/metric.service");
const metric_interceptor_1 = require("./log/metric.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logService = app.get(log_service_1.LogService);
    const metricService = app.get(metric_service_1.MetricService);
    app.useGlobalInterceptors(new response_intercept_1.SuccessResponseTransformInterceptor(), new metric_interceptor_1.MetricInterceptor(metricService));
    app.useGlobalFilters(new database_filter_1.DatabaseExceptionFilter(logService), new http_filter_1.HTTPExceptionFilter(logService));
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    logService.silly('🚀 Application starting...');
    await app.listen(process.env.PORT ?? 3000);
    logService.silly(`✅ Application is running on port ${process.env.PORT ?? 3000}`);
}
void bootstrap();
//# sourceMappingURL=main.js.map