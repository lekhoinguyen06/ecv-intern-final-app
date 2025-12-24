"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const catchEverything_filter_1 = require("./filter/catchEverything.filter");
const logger_service_1 = require("./logger/logger.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(process.env.PORT ?? 3000);
    const loggingService = app.get(logger_service_1.LoggingService);
    app.useGlobalFilters(new catchEverything_filter_1.CatchEverythingFilter(loggingService));
}
void bootstrap();
//# sourceMappingURL=main.js.map