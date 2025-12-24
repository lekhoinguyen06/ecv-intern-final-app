"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const log_service_1 = require("./log/log.service");
const everything_filter_1 = require("./filter/everything.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logService = app.get(log_service_1.LogService);
    app.useGlobalFilters(new everything_filter_1.GlobalExceptionFilter(logService));
    await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
//# sourceMappingURL=main.js.map